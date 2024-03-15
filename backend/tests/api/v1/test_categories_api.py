import pytest
from rest_framework import status

from . import v1_urls

pytestmark = pytest.mark.api


def test_categories_endpoint_is_available(api_client):
    response = api_client.get(v1_urls.CATEGORIES)
    assert response.status_code == status.HTTP_200_OK, (
        'Incorrect status code for empty database'
    )
    assert response.data == [], (
        'No data should be returned when database is empty'
    )


@pytest.mark.parametrize('key', ['id', 'name', 'description'])
def test_categories_response_data_keys(api_client, category, key):
    response = api_client.get(v1_urls.CATEGORIES)
    assert len(response.data) == 1, 'Incorrect number of returned categories'
    assert key in response.data[0], (
        f'Key {key} is missing in response data'
    )


def test_categories_response_data(api_client, category):
    response = api_client.get(v1_urls.CATEGORIES)
    data = category.__dict__
    del data['_state']
    assert response.status_code == status.HTTP_200_OK, (
        'Incorrect status code in successful response'
    )
    assert response.data[0] == data, (
        'Response data should not be empty'
    )
