import pytest
from faker import Faker

from data.models import Category, Item, WebSite

fake = Faker('ru_RU')


@pytest.fixture
def website(db):
    return WebSite.objects.create(
        url=fake.url(),
        name=fake.company()
    )


@pytest.fixture
def category(db):
    return Category.objects.create(
        name=fake.language_name(),
        description=fake.paragraph()
    )


@pytest.fixture
def four_categories(db):
    return Category.objects.bulk_create(
        [Category(name=fake.unique.language_name(),
                  description=fake.paragraph) for _ in range(4)]
    )


@pytest.fixture
def invisible_item(db, category):
    return Item.objects.create(
        category=category,
        name=fake.first_name(),
        description=fake.paragraph(),
        picture='item-images/invisible.jpg',
        price=1000,
    )


@pytest.fixture
def visible_item(db, category):
    return Item.objects.create(
        category=category,
        name=fake.first_name(),
        description=fake.paragraph(),
        picture='item-images/visible.jpg',
        price=1000,
        visible=True
    )


@pytest.fixture
def featured_item(db, category):
    return Item.objects.create(
        category=category,
        name=fake.first_name(),
        description=fake.paragraph(),
        picture='item-images/featured.jpg',
        price=1000,
        visible=True,
        featured=True
    )