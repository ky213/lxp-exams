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
    name: 'Question Bank',
    icon: 'QuestionOutlined',
    routes: [
      {
        path: 'list',
        name: 'List',
        component: './Welcome',
      },
      {
        path: 'edit',
        name: 'Creator',
        component: './QuestionBank/CreateEditQuestions',
      },
      {
        path: 'categories',
        name: 'Categories',
        component: './Welcome',
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
