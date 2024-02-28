import pytest
from rest_framework import status

from . import v1_urls

pytestmark = pytest.mark.api


def test_website_with_no_data_in_database(api_client):
    response = api_client.get(v1_urls.WEBSITE)
    assert response.status_code == status.HTTP_404_NOT_FOUND, (
        'Incorrect status code for empty database'
    )
    assert response.data == None, (
        'No data should be returned when database is empty'
    )


def test_website_with_data_in_database(api_client, web_site):
    response = api_client.get(v1_urls.WEBSITE)
    data = web_site.__dict__
    del data['_state']
    assert response.status_code == status.HTTP_200_OK, (
        'Incorrect status code in successful response'
    )
    assert response.data == data, (
        'Response data should not be empty'
    )

@pytest.mark.parametrize('key', ['id', 'url', 'name', 'slogan', 'email',
                                 'telegram', 'phone', 'address'])
def test_website_response_data_keys(api_client, web_site, key):
    response = api_client.get(v1_urls.WEBSITE)
    assert key in response.data, (
        f'Key {key} is missing in response data'
    )
