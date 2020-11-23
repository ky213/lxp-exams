import { Effect, Reducer } from 'umi';
import { AnyAction } from 'redux';

import { HTTPError } from '@/typings';
import {
  getAll,
  getById,
  getQuesionsByCategories,
  create,
  update,
  remove,
} from '@/services/questionbank/questions';
import { Category } from '@/models/categories';
import { ISurvey } from 'survey-react';
export interface Question {
  _id: string;
  title: string;
  description: string;
  category: Category;
  content: ISurvey;
}

export interface QuestionState {
  allQuestions: Question[];
  currentQuestion: Question | null;
  loading: boolean;
  saveSuccess: boolean;
  error: HTTPError | null;
}

export interface QuestionsModel {
  namespace: 'questions';
  state: QuestionState;
  effects: {
    getAll: Effect;
    getById: Effect;
    getByCategories: Effect;
    create: Effect;
    update: Effect;
    delete: Effect;
    reset: Effect;
  };
  reducers: {
    saveAll: Reducer<QuestionState, AnyAction>;
    saveOne: Reducer<QuestionState, AnyAction>;
    saveUpdate: Reducer<QuestionState, AnyAction>;
    loading: Reducer<QuestionState, AnyAction>;
    error: Reducer<QuestionState, AnyAction>;
    resetState: Reducer<QuestionState, AnyAction>;
  };
}

const initialState: QuestionState = {
  allQuestions: [],
  currentQuestion: null,
  loading: false,
  saveSuccess: false,
  error: null,
};

export enum QUESTIONS_ACTIONS {
  GET_ALL = 'questions/getAll',
  GET_BY_ID = 'questions/getById',
  GET_BY_CATEGORIES = 'questions/getByCategories',
  CREATE = 'questions/create',
  UPDATE = 'questions/update',
  DELETE = 'questions/delete',
  RESET = 'questions/reset',
}

const QuestionsModel: QuestionsModel = {
  namespace: 'questions',
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
        yield put({ type: 'saveOne', payload: data });
      } catch (error) {
        yield put({ type: 'error', payload: error });
      }
    },
    *getByCategories(action, { call, put }) {
      try {
        yield put({ type: 'loading' });
        const { data } = yield call(getQuesionsByCategories, action.payload);
        yield put({ type: 'saveAll', payload: data });
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
        allQuestions: payload,
      };
    },
    saveOne: (state = initialState, { payload }) => {
      return {
        ...state,
        loading: false,
        currentQuestion: payload,
      };
    },
    saveUpdate: (state = initialState, { payload }) => {
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

export default QuestionsModel;
