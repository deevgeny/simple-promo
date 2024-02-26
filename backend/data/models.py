from django.core.exceptions import ValidationError
from django.db import models

from users.models import phone_validator


class WebSite(models.Model):
    """Web site data model."""
    url = models.URLField(
        verbose_name='url',
        help_text='site url address'
    )
    name = models.CharField(
        verbose_name='name',
        max_length=64,
        help_text='site name'
    )
    slogan = models.CharField(
        verbose_name='slogan',
        max_length=256,
        help_text='site slogan',
        blank=True
    )
    email = models.EmailField(
        verbose_name='email',
        max_length=64,
        help_text='email contact',
        blank=True
    )
    telegram = models.CharField(
        verbose_name='telegram',
        max_length=64,
        help_text='telegram contact',
        blank=True
    )
    phone = models.CharField(
        verbose_name='phone number',
        max_length=18,
        blank=True,
        validators=[phone_validator],
        unique=True,
        null=True,
        help_text='phone contact number'
    )
    address = models.CharField(
        verbose_name='address',
        max_length=256,
        blank=True
    )

    def __str__(self):
        return self.url

    def clean_fields(self, exclude=None):
        """Check form data and raise custom field error in admin site."""
        super().clean_fields(exclude)
        if not self.id and WebSite.objects.exists():
            raise ValidationError(
                {'url': ('Only one web site record is allowed. Please try to '
                         'edit the existing record.')}
            )

    def save(self, *args, **kwargs):
        """Only one record is allowed in db (api or programmatically)."""
        if not self.id and WebSite.objects.exists():
            raise ValidationError(
                {'url': ('Only one web site record is allowed. Please try to '
                         'edit the existing record.')}
            )
        super().save(*args, **kwargs)
