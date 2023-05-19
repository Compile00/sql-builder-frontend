/**
 * 路由
 * 配置参考：https://umijs.org/docs/max/layout-menu#%E6%89%A9%E5%B1%95%E7%9A%84%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE
 */
export default [
  {
    name: '代码和数据生成',
    path: '/',
    component: 'index',
  },

  {
    name: '保存的字段',
    path: '/field/all',
    component: 'fieldInfo',
  },

  {
    name: '保存的表',
    path: '/table/all',
    component: 'tableInfo',
  },

  {
    name: '个人词库',
    path: '/dict/all',
    component: 'dict',
  },
  {
    name: '创建个人词库',
    path: '/dict/add',
    component: 'dict/add',
    wrappers: ['@/wrappers/auth'],
  },
  {
    name: '创建个人词库成功',
    path: '/dict/add_result',
    component: 'dict/add_result',
    hideInMenu: true,
    wrappers: ['@/wrappers/auth'],
  },
  {
    path: '/user',
    hideInMenu: true,
    headerRender: false,
    routes: [
      {
        name: '用户登录',
        path: '/user/login',
        component: 'user/login',
      },
      {
        name: '用户注册',
        path: '/user/register',
        component: 'user/register',
      },
    ],
  },
  {
    path: '/admin/user',
    access: 'canAdmin',
    name: '用户管理',
    component: 'admin/user',
  },
  {
    // 设置 links 配置，href 是相对于 public 目录的路径
    links: [
      { 
      rel: 'icon', href: '/src/asset/favicon.png' 
      }
    ],
  },
];
