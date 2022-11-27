export default [
  { path: '/', name: '主页', icon: 'smile', component: './Index' },
  { path: '/interface_info/:id', name: '接口文档', icon: 'smile', component: './InterfaceInfo', hideInMenu: true},
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  // { path: '/welcome', name: '欢迎', icon: 'smile', component: './Index' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { name: '接口管理', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
      // { path: '/admin', redirect: '/admin/sub-page' },
      // { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
