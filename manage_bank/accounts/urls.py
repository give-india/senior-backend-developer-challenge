from django.urls import path
from .views import UserCreateAPIView, UserAccountCreateAPIView, UserAccountUpdateView, TransactionAPIView

urlpatterns = [
    path('user-create', UserCreateAPIView.as_view(), name='user-create'),
    path('account-create', UserAccountCreateAPIView.as_view(), name='account-create'),
    path('account-update', UserAccountUpdateView.as_view(), name='account-update'),
    path('transaction', TransactionAPIView.as_view(), name='transaction')
]
