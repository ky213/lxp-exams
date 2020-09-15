export const routes = [
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
    icon: 'QuestionOutlined',
    routes: [
      {
        path: 'list',
        name: 'List',
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
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './ListTableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
