import pytest
from rest_framework import status

from . import v1_urls

pytestmark = pytest.mark.api


def test_items_endpoint_is_available(api_client):
    response = api_client.get(v1_urls.ITEMS)
    assert response.status_code == status.HTTP_200_OK, (
        'Incorrect status code for empty database'
    )


def test_items_endpoint_is_paginated(api_client):
    response = api_client.get(v1_urls.ITEMS)
    result = {
        'count': 0,
        'next': None,
        'previous': None,
        'results': []
    }
    assert response.status_code == status.HTTP_200_OK, (
        'Incorrect status code for empty database'
    )
    assert response.data == result, 'Incorrect response data'


@pytest.mark.parametrize('key', ['id', 'name', 'description', 'picture',
                                 'price', 'visible', 'featured', 'category'])
def test_items_response_data_keys(api_client, visible_item, key):
    response = api_client.get(v1_urls.ITEMS)
    assert len(response.data['results']) == 1, (
        'Incorrect number of returned items'
    )
    assert key in response.data['results'][0], (
        f'Key {key} is missing in response data'
    )


@pytest.mark.parametrize('key', ['id', 'name', 'description'])
def test_items_response_category_data_keys(api_client, visible_item, key):
    response = api_client.get(v1_urls.ITEMS)
    assert key in response.data['results'][0]['category'], (
        f'Key {key} is missing in response data'
    )


def test_items_by_id_response(api_client, visible_item):
    url = f'{v1_urls.ITEMS}/{visible_item.id}'
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK, (
        f'GET {url}: incorrect status code'
    )


def test_items_returns_only_visible(api_client, invisible_item):
    response = api_client.get(v1_urls.ITEMS)
    assert len(response.data['results']) == 0, (
        'Only visible items should be returned in response'
    )


def test_items_category_filter(api_client, visible_item, four_categories):
    url_1 = f'{v1_urls.ITEMS}?category={visible_item.category.id}'
    url_2 = f'{v1_urls.ITEMS}?category={visible_item.category.id + 1}'
    response = api_client.get(url_1)
    assert len(response.data['results']) == 1, (
        'Filtered element should be returned'
    )
    response = api_client.get(url_2)
    assert len(response.data['results']) == 0, (
        'Unfiltered element should not be returned'
    )


def test_items_category_filter_error(api_client, visible_item):
    url = f'{v1_urls.ITEMS}?category={visible_item.category.id + 1}'
    error_message = ('Select a valid choice. That choice is not one of the '
                    'available choices.')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, (
        'Filter error should return HTTP 400'
    )
    assert response.data['category'][0] == error_message, (
        'Incorrect error message'
    )


def test_items_featured_filter(api_client, visible_item, featured_item):
    url = f'{v1_urls.ITEMS}?featured=true'
    response = api_client.get(url)
    assert len(response.data['results']) == 1, (
        'Should return only featured items'
    )
