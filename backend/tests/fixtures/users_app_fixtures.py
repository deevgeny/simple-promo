import pytest
from django.contrib.auth import get_user_model
from faker import Faker

User = get_user_model()
fake = Faker('ru_RU')


@pytest.fixture
def user(db):
    pwd = fake.password()
    return User.objects.create_user(
        first_name=fake.first_name_male(),
        last_name=fake.last_name_male(),
        email=fake.email(),
        phone='9993332211',
        password=pwd
    ), pwd
