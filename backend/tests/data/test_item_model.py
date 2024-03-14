import pytest

from data.models import Category, Item, item_picture_path

pytestmark = pytest.mark.unit


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'category'],
                          ['help_text', 'Select item category'],
                          ['blank', False],
                          ['_related_name', 'items']])
def test_category_field(field_attr, value):
    field = 'category'
    assert getattr(Item._meta.get_field(field), field_attr) == value, (
        f'Item.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


def test_category_field_related_model():
    assert Item._meta.get_field('category').related_model == Category, (
        f'Item.category field should be defined as to=Category'
    )


def test_category_field_on_delete_attribute():
    assert Item._meta.get_field(
        'category').remote_field.on_delete.__name__ == 'PROTECT', (
        f'Item.category field should be defined as on_delete=models.PROTECT'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'name'],
                          ['help_text', 'Item name'],
                          ['blank', False],
                          ['unique', True],
                          ['max_length', 64]])
def test_name_field(field_attr, value):
    field = 'name'
    assert getattr(Item._meta.get_field(field), field_attr) == value, (
        f'Item.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'description'],
                          ['help_text', 'Item description'],
                          ['blank', False],
                          ['max_length', 256]])
def test_description_field(field_attr, value):
    field = 'description'
    assert getattr(Item._meta.get_field(field), field_attr) == value, (
        f'Item.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'picture'],
                          ['upload_to', 'item_picture_path'],
                          ['help_text', 'Item picture'],
                          ['blank', False]])
def test_picture_field(field_attr, value):
    field = 'picture'
    if field_attr != 'upload_to':
        assert getattr(Item._meta.get_field(field), field_attr) == value, (
            f'Item.{field} field should be defined as '
            f'{field_attr}={repr(value)}'
        )
    else:
        assert getattr(Item._meta.get_field(field),
                       field_attr).__name__ == value, (
            f'Item.{field} field should be defined as '
            f'{field_attr}={repr(value)}'
        )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'price'],
                          ['help_text', 'Item price'],
                          ['blank', False],
                          ['max_digits', 10],
                          ['decimal_places', 2]])
def test_price_field(field_attr, value):
    field = 'price'
    assert getattr(Item._meta.get_field(field), field_attr) == value, (
        f'Item.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'visible'],
                          ['help_text', 'Make item visible to users'],
                          ['blank', False],
                          ['default', False]])
def test_visible_field(field_attr, value):
    field = 'visible'
    assert getattr(Item._meta.get_field(field), field_attr) == value, (
        f'Item.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('field_attr, value',
                         [['verbose_name', 'featured'],
                          ['help_text', 'Display item in featured'],
                          ['blank', False],
                          ['default', False]])
def test_featured_field(field_attr, value):
    field = 'featured'
    assert getattr(Item._meta.get_field(field), field_attr) == value, (
        f'Item.{field} field should be defined as '
        f'{field_attr}={repr(value)}'
    )


@pytest.mark.parametrize('attr, value', [['ordering', ['id']]])
def test_model_meta_class(attr, value):
    assert getattr(Item._meta, attr) == value, (
        f'Item._meta.{attr} field should be defined as '
        f'{attr}={repr(value)}'
    )


def test_model_str_method(item):
    obj = item
    value = f'{obj.category} - {obj.name}'
    assert obj.__str__() == value, (
        'Model.__str__() method returned incorrect value'
    )


def test_item_picture_path_function():
    instance = Item()
    instance.name = 'new'
    filename = 'somename.jpg'
    value = 'item-images/item-id-new.jpg'
    assert item_picture_path(instance, filename) == value, (
        'Incorrect path and filename returned from item_picture_path()'
    )
