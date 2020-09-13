import { Effect } from 'dva';
import { Reducer, AnyAction } from 'redux';

import { HTTPError } from '@/typings';
import { getAll, getById, create, update, remove } from '@/services//QuestionBank/categories';

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CategoryState {
  allCategories: Category[];
  currentCategory: Category | null;
  loading: boolean;
  error: HTTPError | null;
}

export interface CategoriesModel {
  namespace: 'categories';
  state: CategoryState;
  effects: {
    getAll: Effect;
    getById: Effect;
    update: Effect;
    delete: Effect;
  };
  reducers: {
    saveAll: Reducer<CategoryState, AnyAction>;
    saveById: Reducer<CategoryState, AnyAction>;
    update: Reducer<CategoryState, AnyAction>;
    delete: Reducer<CategoryState, AnyAction>;
    loading: Reducer<CategoryState, AnyAction>;
    error: Reducer<CategoryState, AnyAction>;
  };
}

const initialState: CategoryState = {
  allCategories: [],
  currentCategory: null,
  loading: false,

  error: null,
};

const CategoriesModel: CategoriesModel = {
  namespace: 'categories',
  state: initialState,
  effects: {
    *getAll(action, { call, put }) {
      try {
        yield put({ type: 'loading' });
        const categorie = yield call(getAll);
        yield put({ type: 'saveAll', payload: categorie });
      } catch (error) {
        yield put({ type: 'error', payload: error });
      }
    },
    *getById() {},
    *update() {},
    *delete() {},
  },
  reducers: {
    saveAll: (state = initialState, { payload }) => {
      return { ...state, loading: false, allCategories: payload };
    },

    saveById: (state = initialState, { payload }) => {
      return { ...state, loading: false, currentCategory: payload };
    },

    update: (state = initialState, { payload }) => {
      return { ...state, loading: false, currentCategory: payload };
    },

    delete: (state = initialState, { payload }) => {
      return { ...state, loading: false };
    },

    loading: (state = initialState, { payload }) => {
      return { ...state, loading: true };
    },

    error: (state = initialState, { payload }) => {
      return { ...state, loading: false, error: payload };
    },
  },
};

export default CategoriesModel;
