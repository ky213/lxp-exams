import { Effect, Reducer } from 'umi';
import { AnyAction } from 'redux';

import { HTTPError } from '@/typings';
import { getAll, getById, create, update, remove } from '@/services//QuestionBank/categories';

export interface Category {
  _id: string;
  name: string;
  description: string;
}

export interface CategoryState {
  allCategories: Category[];
  currentCategory: Category | null;
  loading: boolean;
  saveSuccess: boolean;
  error: HTTPError | null;
}

export interface CategoriesModel {
  namespace: 'categories';
  state: CategoryState;
  effects: {
    getAll: Effect;
    getById: Effect;
    create: Effect;
    update: Effect;
    delete: Effect;
    reset: Effect;
  };
  reducers: {
    saveAll: Reducer<CategoryState, AnyAction>;
    saveOne: Reducer<CategoryState, AnyAction>;
    saveUpdate: Reducer<CategoryState, AnyAction>;
    loading: Reducer<CategoryState, AnyAction>;
    error: Reducer<CategoryState, AnyAction>;
    resetState: Reducer<CategoryState, AnyAction>;
  };
}

const initialState: CategoryState = {
  allCategories: [],
  currentCategory: null,
  loading: false,
  saveSuccess: false,
  error: null,
};

export enum CATEGORIES_ACTIONS {
  GET_ALL = 'categories/getAll',
  GET_BY_ID = 'categories/getById',
  CREATE = 'categories/create',
  UPDATE = 'categories/update',
  DELETE = 'categories/delete',
  RESET = 'categories/reset',
}

const CategoriesModel: CategoriesModel = {
  namespace: 'categories',
  state: initialState,
  effects: {
    *getAll(_, { call, put }) {
      try {
        yield put({ type: 'loading' });
        const { data } = yield call(getAll);
        yield put({ type: 'saveAll', payload: data });
      } catch (error) {
        yield put({ type: 'error', payload: error });
      }
    },
    *getById(action, { call, put }) {
      try {
        yield put({ type: 'loading' });
        const { data } = yield call(getById, action.payload);
        yield put({ type: 'saveOne', payload: data[0] });
      } catch (error) {
        yield put({ type: 'error', payload: error });
      }
    },
    *create(action, { call, put }) {
      try {
        yield put({ type: 'loading' });
        const { data } = yield call(create, action.payload);
        yield put({ type: 'saveUpdate', payload: data });
      } catch (error) {
        yield put({ type: 'error', payload: error });
      }
    },
    *update(action, { call, put }) {
      try {
        yield put({ type: 'loading' });
        const { data } = yield call(update, action.payload);
        yield put({ type: 'saveUpdate', payload: data });
      } catch (error) {
        yield put({ type: 'error', payload: error });
      }
    },
    *delete(action, { call, put }) {
      try {
        yield put({ type: 'loading' });
        yield call(remove, action.payload);
        yield put({ type: 'getAll' });
      } catch (error) {
        yield put({ type: 'error', payload: error });
      }
    },
    *reset(action, { put }) {
      try {
        yield put({ type: 'resetState' });
      } catch (error) {
        yield put({ type: 'error', payload: error });
      }
    },
  },
  reducers: {
    saveAll: (state = initialState, { payload }) => {
      return {
        ...state,
        loading: false,
        allCategories: payload,
      };
    },
    saveOne: (state = initialState, { payload }) => {
      return {
        ...state,
        loading: false,
        currentCategory: payload,
      };
    },
    saveUpdate: (state = initialState) => {
      return {
        ...state,
        loading: false,
        saveSuccess: true,
      };
    },
    loading: (state = initialState) => {
      return { ...state, loading: true, saveSuccess: false, error: null };
    },
    error: (state = initialState, { payload }) => {
      return { ...state, loading: false, saveSuccess: false, error: payload };
    },
    resetState: (state = initialState) => {
      return { ...initialState };
    },
  },
};

export default CategoriesModel;
