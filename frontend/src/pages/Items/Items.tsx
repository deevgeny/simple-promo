import React, { useReducer, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useErrorContext from '../../hooks/useErrorContext';
import { api, TQueryParams } from '../../services/api';
import { ApiError } from '../../services/error';
import { 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
 } from '@mui/material';
 import {
  TCategory,
  TItem 
} from '../../components/FeaturedItems/FeaturedItemCard';

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

function Items() {
  const controller = new AbortController();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setError } = useErrorContext();
  
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
        setError(new ApiError(error));
      }
    };

    getCategories();
  
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Update category filter state (dropdown field) and request filtered itmes 
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
        setError(new ApiError(error));
      }
    };

    getItems();

    // eslint-disable-next-line
  }, [searchParams]);

  return (
    <>
      <FormControl size='small' sx={{ minWidth: 150, mb: 2 }}>
        <InputLabel id='category-filter-label'>Категория</InputLabel>
        <Select
          labelId='category-filter-label'
          id='category-filter'
          name='category-filter'
          value={state.categoryFilter}
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
    </>
   
  );
}

export default Items;