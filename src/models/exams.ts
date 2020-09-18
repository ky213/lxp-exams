import { Effect, Reducer } from 'umi';
import { AnyAction } from 'redux';

import { HTTPError } from '@/typings';
import { getAll, getById, create, update, remove } from '@/services/questionbank/questions';
import { Category } from '@/models/categories';
import { SurveyObjects } from 'survey-creator';

export interface Survey {
  _id: string;
  name: string;
  description: string;
  type: 'EXAM' | 'QUIZ' | 'SURVEY';
  content: SurveyObjects;
}

export interface Exam extends Survey {
  categories: Category[];
  timing: number;
  maxAttemps: number;
  gradingMethod: 'AVERAGE_ATTEMPT' | 'LAST_ATTEMPT' | 'HIGHEST_ATTEMPT';
  questionsPerPage: number;
  minPassScore: number;
  showFeedBack: boolean;
  outOfMark: number;
  creationMode: 'RANDOM' | 'MANUAL';
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

export default ExamsModel;
