import { IRoute } from 'umi';

export const routes: IRoute[] = [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/questions',
    name: 'Questions',
    icon: 'QuestionCircleFilled',
    routes: [
      {
        path: 'list',
        name: 'List',
        icon: 'QuestionCircleFilled',
        component: './QuestionBank/Questions',
      },
      {
        path: 'edit',
        name: 'Create',
        component: './QuestionBank/CreateEditQuestions',
      },
      {
        path: 'edit/:id',
        component: './QuestionBank/CreateEditQuestions',
      },
      {
        path: 'categories',
        name: 'Categories',
        routes: [
          {
            path: 'list',
            name: 'List',
            component: './QuestionBank/Categories',
          },
          {
            path: 'edit',
            name: 'Create',
            component: './QuestionBank/CreateEditCategory',
          },
          {
            path: 'edit/:id',
            component: './QuestionBank/CreateEditCategory',
          },
        ],
      },
    ],
  },
  {
    path: '/exams',
    name: 'Exams',
    icon: 'BulbFilled',
    routes: [
      {
        path: 'list',
        name: 'List',
        component: './Exams/Exams',
      },
      {
        path: 'edit',
        name: 'Create',
        component: './Exams/CreateEditExams',
      },
      {
        path: 'take-exam/:examId',
        component: './Exams/ExamDelivery',
        layout: false,
      },
    ],
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './ListTableList',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
