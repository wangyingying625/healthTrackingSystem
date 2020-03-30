import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/content/index';
import record from '@/components/content/record';
import oneClick from '@/components/content/oneClick';
import Template from '@/components/content/Template';
import family from '@/components/content/family';
import editGeren from '@/components/content/editGeren';
import geRen from '@/components/content/geRen';
import recordPicture from '@/components/content/recordPicture';
import login from '@/components/login/login';
import register from '@/components/login/register';
import loginAndRegister from '@/components/login/login_register';
import layout from '@/components/layout/layout';

Vue.use(Router);
/* 初始路由 */
export default new Router({
  routes: [
    {
      path: '/loginAndRegister',
      component: loginAndRegister,
      children: [
        {
          id: 8,
          path: '/login',
          component: login,
          meta: {
            name: '登录'
          }
        },
        {
          id: 9,
          path: '/register',
          component: register,
          meta: {
            name: '注册'
          }
        }
      ]
    },
    {
      path: '/',
      component: layout,
      children: [
        {
          id: 1,
          path: 'index',
          component: index,
          meta: {
            name: '首页'
          }
        },
        {
          id: 2,
          path: '/recordPicture',
          component: recordPicture,
          meta: {
            name: '图片记录'
          }
        },
        {
          id: 3,
          path: '/oneClick',
          component: oneClick,
          meta: {
            name: '一键上传'
          }
        },
        {
          id: 4,
          path: '/Template',
          component: Template,
          meta: {
            name: '模板上传'
          }
        },
        {
          id: 5,
          path: '/record',
          component: record,
          meta: {
            name: '病历记录'
          }
        },
        {
          id: 6,
          path: '/family',
          component: family,
          meta: {
            name: '我的家庭'
          }
        },
        {
          id: 7,
          path: '/geRen',
          component: geRen,
          meta: {
            name: '我的资料'
          }
        },
        {
          id: 8,
          path: '/editGeren',
          component: editGeren,
          meta: {
            name: '编辑资料'
          }
        }
      ]
    }
  ]
});
