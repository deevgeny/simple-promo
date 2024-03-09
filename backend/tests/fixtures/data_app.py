import pytest
from faker import Faker

from data.models import WebSite

fake = Faker('ru_RU')


@pytest.fixture
def website(db):
    return WebSite.objects.create(
        url=fake.url(),
        name=fake.company()
    )
