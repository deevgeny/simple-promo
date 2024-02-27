import pytest
from django.core.exceptions import ValidationError
from django.core.validators import MaxLengthValidator

from data.models import WebSite

pytestmark = pytest.mark.unit


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'url'],
                          ['help_text', 'site url address'],
                          ['blank', False]])
def test_url_field(field_attr, value):
    field = 'url'
    assert getattr(WebSite._meta.get_field(field), field_attr) == value, (
        f'WebSite.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'name'],
                          ['help_text', 'site name'],
                          ['max_length', 64],
                          ['blank', False]])
def test_name_field(field_attr, value):
    field = 'name'
    assert getattr(WebSite._meta.get_field(field), field_attr) == value, (
        f'WebSite.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'slogan'],
                          ['help_text', 'site slogan'],
                          ['max_length', 256],
                          ['blank', True]])
def test_slogan_field(field_attr, value):
    field = 'slogan'
    assert getattr(WebSite._meta.get_field(field), field_attr) == value, (
        f'WebSite.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'email'],
                          ['help_text', 'email contact'],
                          ['max_length', 64],
                          ['blank', True]])
def test_email_field(field_attr, value):
    field = 'email'
    assert getattr(WebSite._meta.get_field(field), field_attr) == value, (
        f'WebSite.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'telegram'],
                          ['help_text', 'telegram contact'],
                          ['max_length', 64],
                          ['blank', True]])
def test_telegram_field(field_attr, value):
    field = 'telegram'
    assert getattr(WebSite._meta.get_field(field), field_attr) == value, (
        f'WebSite.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'phone number'],
                          ['help_text', 'phone contact number'],
                          ['max_length', 18],
                          ['blank', True],
                          ['unique', True],
                          ['null', True]])
def test_phone_field(field_attr, value):
    field = 'phone'
    assert getattr(WebSite._meta.get_field(field), field_attr) == value, (
        f'WebSite.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'address'],
                          ['help_text', ''],
                          ['max_length', 256],
                          ['blank', True]])
def test_address_field(field_attr, value):
    field = 'address'
    assert getattr(WebSite._meta.get_field(field), field_attr) == value, (
        f'WebSite.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


def test_phone_field_validators():
    field = 'phone'
    count = 2
    validators = ['phone_validator']
    assert len(WebSite._meta.get_field(field).validators) == count, (
        f'WebSite.{field} should have {count} validators'
    )
    assert (
        WebSite._meta.get_field(field).validators[0].__name__ in validators
    ), (
         '`phone_is_digit` validator is missing'
    )
    assert isinstance(WebSite._meta.get_field(field).validators[1],
                   MaxLengthValidator), 'MaxLengthValidator is missing'


def test_model_clean_fields_method(web_site):
    obj = WebSite(url='http://example.com', name='new name')
    error_value = ("{'url': ['Only one web site record is allowed. Please try "
                   "to edit the existing record.']}")
    with pytest.raises(ValidationError) as e:
        obj.clean_fields()
    assert str(e.value) == error_value, 'Incorrect validation error value'


def test_model_save_method(web_site):
    with pytest.raises(ValidationError):
        WebSite.objects.create(url='http://example.com', name='new name')
    assert WebSite.objects.count() == 1, (
        'Only one record is allowed to be created in database'
    )
