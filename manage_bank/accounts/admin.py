from django.contrib import admin
from accounts.models import User, AccountType, UserAccount, Transaction

# Register your models here.


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'first_name', 'last_name', 'email',)
    ordering = ('-id',)


@admin.register(AccountType)
class AccountTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'max_limit',)
    ordering = ('-id',)


@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('account_id', 'user', 'account_type', 'balance',)
    ordering = ('-account_id',)


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'from_account', 'to_account', 'amount', 'status', 'transferred_at',)
    ordering = ('-id',)
