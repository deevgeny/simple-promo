from django.core.exceptions import ValidationError
from django.db import models

from users.models import phone_validator


def banner_path(instance, filename):
    """Return banner path and filename."""
    return f'website-images/banner.{filename.split(".")[-1]}'


def item_picture_path(instance, filename):
    """Return item picture path and filename."""
    return f'item-images/{instance.name}.{filename.split(".")[-1]}'


class WebSite(models.Model):
    """Web site data model."""
    url = models.URLField(
        verbose_name='url',
        help_text='site url address'
    )
    name = models.CharField(
        verbose_name='name',
        max_length=64,
        help_text='site name',
        blank=True
    )
    slogan = models.CharField(
        verbose_name='slogan',
        max_length=256,
        help_text='site slogan',
        blank=True
    )
    banner = models.ImageField(
        verbose_name='website banner image',
        upload_to=banner_path,
        help_text='website header banner image',
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


class Category(models.Model):
    """Item category model."""
    name = models.CharField(
        verbose_name='name',
        max_length=64,
        help_text='Item category name',
        unique=True
    )
    description = models.CharField(
        verbose_name='description',
        max_length=256,
        help_text='Item category description',
    )

    class Meta:
        ordering = ['id']
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class Item(models.Model):
    """Item model."""
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='items',
        verbose_name='category',
        help_text='Select item category'
    )
    name = models.CharField(
        verbose_name='name',
        max_length=64,
        help_text='Item name',
        unique=True
    )
    description = models.CharField(
        verbose_name='description',
        max_length=256,
        help_text='Item description'
    )
    picture = models.ImageField(
        verbose_name='picture',
        upload_to=item_picture_path,
        help_text='Item picture'
    )
    price = models.DecimalField(
        verbose_name='price',
        max_digits=10,
        decimal_places=2,
        help_text='Item price'
    )
    visible = models.BooleanField(
        verbose_name='visible',
        default=False,
        help_text='Make item visible to users'
    )
    featured = models.BooleanField(
        verbose_name='featured',
        default=False,
        help_text='Display item in featured'
    )

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f'{self.category} - {self.name}'
