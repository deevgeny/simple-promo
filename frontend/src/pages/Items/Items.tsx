import React, { useReducer, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useResponseError from '../../hooks/useResponseError';
import { api, TQueryParams } from '../../services/api';
import {
  Grid, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
 } from '@mui/material';
 import ItemCard, { TCategory, TItem } from '../../components/ItemCard';
import NoData from '../../components/NoData';
import Paginator from '../../components/Paginator';

type TState = {
  categoryFilter: string;
  categories?: TCategory[];
  items?: TItem[];
  next: string | null;
  previous: string | null;
};

type TNewState = {
  categoryFilter?: string;
  categories?: TCategory[];
  items?: TItem[];
  next?: string | null;
  previous?: string | null;
};

const initialState: TState = {
  categoryFilter: '',
  next: null,
  previous: null
};

const reducer = (state: TState, action: {type: string; state?: TNewState}) => {
  switch(action.type) {
    case 'reset':
      return initialState;
    case 'update':
      return { ...state, ...action.state };
    default:
      return state;
  }
};

/**
 * Items page.
 */
function Items() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setResponseError } = useResponseError();
  
  const handleCategoryFilter = (event: SelectChangeEvent) => {
    // Update search params in url, similar to navigate()
    if (event.target.value !== '') {
      setSearchParams({category: event.target.value});
    } else {
      setSearchParams();
    }
  };

  useEffect(() => {
    // Get list of categories and update state for dropdown category filter
    const controller = new AbortController();
    const getCategories = async () => {
      const { response, error } = await api.getCategories(controller);
      if (response?.data) {
        dispatch({
          type: 'update',
          state: {
            categories: response.data
          }
        });
      } else if (error) {
        setResponseError(error)
      }
    };

    getCategories();
  
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Update category filter state (dropdown field) and make filtered request 
    const controller = new AbortController();
    dispatch({
      type: 'update',
      state: {
        categoryFilter: searchParams.get('category') || ''
      }
    });

    const getItems = async () => {
      let params: TQueryParams | undefined;
      if (searchParams.size) {
        params = Object.fromEntries(searchParams.entries());
      }
      const { response, error } = await api.getItems(controller, params);
      if (response?.data) {
        dispatch({
          type: 'update',
          state: {
            items: response.data?.results,
            next: response.data?.next,
            previous: response.data?.previous
          }
        });
      } else if (error) {
        setResponseError(error)
      }
    };

    getItems();

    // eslint-disable-next-line
  }, [searchParams]);

  return (
    <>
      <FormControl size='small' sx={{ minWidth: 150, mb: 3 }}>
        <InputLabel id='category-filter-label'>Категория</InputLabel>
        <Select
          labelId='category-filter-label'
          id='category-filter'
          name='category-filter'
          // MUI warning: out-of-range value
          value={state.categories ? state.categoryFilter : ''}
          onChange={handleCategoryFilter}
          label='Категория'
        >
          <MenuItem key={0} value=''>
            Все
          </MenuItem>
          {state?.categories?.map((category, index) => (
            <MenuItem
              key={category.id}
              value={category.id}
            >
              {category.name}
            </MenuItem>))
          }
        </Select>
      </FormControl>
      <Grid container spacing={4}>
        {state.items?.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <ItemCard item={item}/>
          </Grid>
        ))}
      </Grid>
      {state.items?.length
        ? <Paginator previous={state.previous} next={state.next} />
        : <NoData />
      }
    </>
  );
}

export default Items;