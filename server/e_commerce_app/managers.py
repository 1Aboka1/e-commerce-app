from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.db import models
class CustomUserManager(BaseUserManager):
    def create_superuser(self, email, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, first_name, password, **other_fields)

    def create_user(self, email, first_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        other_fields.setdefault('is_active', True)
        other_fields['is_active'] = True

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user

class ShoppingSessionManager(models.Manager):
    def get_queryset(self):
        qs = super(ShoppingSessionManager, self).get_queryset().annotate(total=models.Count('items'))
        return qs
