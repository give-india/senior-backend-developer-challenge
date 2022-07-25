from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import User, UserAccount, AccountType, Transaction
from .serializers import UserSerializer, UserAccountSerializer, UserAccountUpdateSerializer, TransactionSerializer
from common.constants import Status


# Create your views here.
class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class UserAccountCreateAPIView(generics.CreateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer
    permission_classes = (AllowAny,)


class UserAccountUpdateView(APIView):
    def put(self, request):
        if not request.data.get('account_id'):
            return Response(data={'error': "Account is not selected"}, status=status.HTTP_400_BAD_REQUEST)
        elif not request.data.get('balance'):
            return Response(data={'error': "Balance field required."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            account = UserAccount.objects.get(account_id=request.data.get('account_id'))
            basic_savings = AccountType.objects.get(title='Basic Savings')
            if account.account_type.title == basic_savings.title and (request.data.get(
                    'balance') / 100) > basic_savings.max_limit:
                return Response(data={"error": f"Basic Savings can hold max {basic_savings.max_limit} amount."},
                                status=status.HTTP_400_BAD_REQUEST)
            serializer = UserAccountUpdateSerializer(data=request.data, instance=account)
            if serializer.is_valid():
                _ = serializer.save()
                response = Response(
                    serializer.data, status=status.HTTP_201_CREATED)
                return response
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_serializer_errors_list(errors):
    return {'errors': [{key: val} for key, val in errors.items()]}


class TransactionAPIView(APIView):

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            from_account = serializer.validated_data.get("from_account")
            to_account = serializer.validated_data.get("to_account")
            basic_savings = AccountType.objects.get(title='Basic Savings')
            amount = serializer.validated_data.get("amount") / 100
            if from_account.user == to_account.user:
                transaction = serializer.save()
                transaction.status = Status.SERVER_ERROR
                transaction.save()
                return Response(data={
                    'error': f"Cannot transfer to same the account."},
                    status=status.HTTP_400_BAD_REQUEST)
            elif from_account.balance < amount:
                transaction = serializer.save()
                transaction.status = Status.INSUFFICIENT_BALANCE
                transaction.save()
                return Response(data={'error': "Insufficient balance in the source account"},
                                status=status.HTTP_400_BAD_REQUEST)
            elif to_account.account_type.title == basic_savings.title and (
                    to_account.balance + amount) > basic_savings.max_limit:
                transaction = serializer.save()
                transaction.status = Status.SERVER_ERROR
                transaction.save()
                return Response(data={
                    'error': f"Destination account is of Basic Savings and "
                             f"exceeds limit of holding up to {basic_savings.max_limit}."},
                    status=status.HTTP_400_BAD_REQUEST)
            from_account.balance = from_account.balance - amount
            from_account.save()
            to_account.balance = to_account.balance + amount
            to_account.save()
            transaction = serializer.save()
            response = Response(
                serializer.data, status=status.HTTP_201_CREATED)
            response.data.update({"source_account_balance": from_account.balance,
                                  "total_dest_account_balance": sum(
                                      [account.balance for account in to_account.user.accounts.all()]),
                                  "status": transaction.status,
                                  "transferred_at": transaction.transferred_at})
            return response
        response = get_serializer_errors_list(serializer.errors)
        response = Response(response,
                            status=status.HTTP_400_BAD_REQUEST)
        response.data.update({"success": False})
        return response
