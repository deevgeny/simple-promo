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
def item(db, category):
    return Item.objects.create(
        category=category,
        name=fake.first_name(),
        description=fake.paragraph(),
        picture='/media/item-images/1.jpg',
        price=1000,
        visible=True
    )