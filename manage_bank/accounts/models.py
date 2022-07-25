from django.db import models
from django.contrib.auth.models import AbstractUser

from common.constants import Status


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username


class AccountType(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    max_limit = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.title


class UserAccount(models.Model):
    account_id = models.CharField(max_length=200, unique=True)
    user = models.ForeignKey(to=User, related_name='accounts', on_delete=models.CASCADE)
    account_type = models.ForeignKey(to=AccountType, on_delete=models.CASCADE)
    balance = models.IntegerField(default=0)

    def __str__(self):
        return self.account_id


class Transaction(models.Model):
    from_account = models.ForeignKey(to=UserAccount, to_field='account_id', related_name="from_account",
                                     on_delete=models.CASCADE)
    to_account = models.ForeignKey(to=UserAccount, to_field='account_id', related_name="to_account",
                                   on_delete=models.CASCADE)
    amount = models.IntegerField()
    status = models.CharField(
        max_length=21,
        choices=Status.CHOICES,
        default=Status.SUCCESS,
    )
    transferred_at = models.DateTimeField(auto_now_add=True)
