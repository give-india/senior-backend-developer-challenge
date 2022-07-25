import random
from rest_framework import serializers
from .models import User, UserAccount, Transaction


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username', 'password')

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserAccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserAccount
        fields = ('user', 'account_type', 'balance', 'account_id')
        read_only_fields = ('account_id',)

    def create(self, validated_data):
        account = super(UserAccountSerializer, self).create(validated_data)
        account.account_id = random.randint(10**11, 10**12-1)
        account.save()
        return account


class UserAccountUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserAccount
        fields = ['account_id', 'balance']

    def update(self, instance, validated_data):
        validated_data['balance'] = validated_data.get('balance') / 100
        account = super().update(instance=instance, validated_data=validated_data)
        account.save()
        return account


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = ('from_account', 'to_account', 'amount', 'status', 'transferred_at')
        read_only_fields = ('status', 'transferred_at')

    def create(self, validated_data):
        validated_data['amount'] = validated_data['amount'] / 100
        transaction = super(TransactionSerializer, self).create(validated_data)
        return transaction
