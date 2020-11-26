import { Effect, Reducer } from 'umi';
import { AnyAction } from 'redux';

import { HTTPError } from '@/typings';
import { getAll, getById, create, update, remove, saveResult } from '@/services/exams';
import { Category } from '@/models/categories';
import { ISurvey } from 'survey-react';

export type ExamType = 'EXAM' | 'QUIZ' | 'SURVEY';

export type ExamSource = 'QUESTION_BANK' | 'NO_QUESTION_BANK';

export type ExamMode = 'RANDOM' | 'MANUAL';

export type ExamGradingMethod = 'AVERAGE_ATTEMPT' | 'LAST_ATTEMPT' | 'HIGHEST_ATTEMPT';

export type ExamGradingMode = 'AUTOMATIC' | 'MANUAL';

export type Settings = {
  name: string;
  description: string;
  maxTimeToFinish: number;
  maxAttemps: number;
  gradingMethod: ExamGradingMethod;
  gradingMode: ExamGradingMode;
  validFromDate: string;
  validToDate: string;
  numberOfQuestions: number;
  questionsPerPage: number;
  minPassScore: number;
  showFeedBack: boolean;
  outOfMark: number;
};
export interface Exam {
  _id?: string;
  settings: Settings;
  categories: Category[];
  mode: ExamMode;
  source: ExamSource;
  type: ExamType;
  content: ISurvey;
}

export interface ExamResult {
  userId: string;
  examId: string;
  score?: number;
  timeSpent: number;
  numberOfAttempts?: number;
  answers: { [key: string]: string };
}

export interface ExamState {
  allExams: Exam[];
  currentExam: Exam | null;
  loading: boolean;
  saveSuccess: boolean;
  error: HTTPError | null;
}

export interface ExamsModel {
  namespace: 'exams';
  state: ExamState;
  effects: {
    getAll: Effect;
    getById: Effect;
    create: Effect;
    update: Effect;
    delete: Effect;
    saveResult: Effect;
    reset: Effect;
  };
  reducers: {
    saveAll: Reducer<ExamState, AnyAction>;
    saveOne: Reducer<ExamState, AnyAction>;
    saveUpdate: Reducer<ExamState, AnyAction>;
    loading: Reducer<ExamState, AnyAction>;
    error: Reducer<ExamState, AnyAction>;
    resetState: Reducer<ExamState, AnyAction>;
  };
}

const initialState: ExamState = {
  allExams: [],
  currentExam: null,
  loading: false,
  saveSuccess: false,
  error: null,
};

export enum EXAMS_ACTIONS {
  GET_ALL = 'exams/getAll',
  GET_BY_ID = 'exams/getById',
  CREATE = 'exams/create',
  UPDATE = 'exams/update',
  DELETE = 'exams/delete',
  SAVE_RESULT = 'exams/saveResult',
  RESET = 'exams/reset',
}

const ExamsModel: ExamsModel = {
  namespace: 'exams',
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
    *saveResult(action, { call, put }) {
      try {
        yield put({ type: 'loading' });
        yield call(saveResult, action.payload);
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
        allExams: payload,
      };
    },
    saveOne: (state = initialState, { payload }) => {
      return {
        ...state,
        loading: false,
        currentExam: payload,
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
      return initialState;
    },
  },
};

export default ExamsModel;
