import pytest

from data.models import Category

pytestmark = pytest.mark.unit


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'name'],
                          ['help_text', 'Item category name'],
                          ['blank', False],
                          ['unique', True],
                          ['max_length', 64]])
def test_name_field(field_attr, value):
    field = 'name'
    assert getattr(Category._meta.get_field(field), field_attr) == value, (
        f'Category.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'description'],
                          ['help_text', 'Item category description'],
                          ['blank', False],
                          ['max_length', 256]])
def test_description_field(field_attr, value):
    field = 'description'
    assert getattr(Category._meta.get_field(field), field_attr) == value, (
        f'Category.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('attr, value',
                         [['ordering', ['id']],
                          ['verbose_name_plural', 'categories']])
def test_model_meta_class(attr, value):
    assert getattr(Category._meta, attr) == value, (
        f'Category._meta.{attr} field should be defined as '
        f'{attr}={repr(value)}'
    )


def test_model_str_method(category):
    obj = category
    assert obj.__str__() == obj.name, (
        'Model.__str__() method returned incorrect value'
    )
