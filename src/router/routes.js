import Layout from '@/components/layout/index.vue'
import PageNotFound from '@/components/error/404.vue'

const routes = [
    {
        hidden: true,
        path: '/login',
        component: () => import('@/views/system/login.vue'),
        meta: {
            title: '登录'
        }
    },
    // {
    //     path: '/',
    //     component: Layout,
    //     meta: {
    //         title: '系统管理'
    //     },
    //     children: [
    //         {
    //             path: 'admin',
    //             component: () => import('@/views/system/admin/index.vue'),
    //             meta: {
    //                 title: '用户管理'
    //             }
    //         },
    //         {
    //             path: 'role',
    //             component: PageNotFound,
    //             meta: {
    //                 title: '角色管理'
    //             }
    //         },
    //         {
    //             path: 'menu',
    //             component: PageNotFound,
    //             meta: {
    //                 title: '菜单管理'
    //             }
    //         },
    //         {
    //             path: 'dept',
    //             component: PageNotFound,
    //             meta: {
    //                 title: '部门管理'
    //             }
    //         },
    //         {
    //             path: 'config',
    //             component: PageNotFound,
    //             meta: {
    //                 title: '系统配置'
    //             }
    //         }

    //     ]
    // },
    // {
    //     path: '/ws',
    //     component: Layout,
    //     meta: {
    //         title: '我测试'
    //     },
    //     children: [
    //         {
    //             path: 'lzsb',
    //             component: PageNotFound,
    //             meta: {
    //                 title: '系统设置'
    //             }
    //         },

    //     ]
    // },
    // { path: '/woc', component: PageNotFound, hidden: true },


    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '404',
                component: PageNotFound
            }
        ],
        hidden: true
    },
    { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]


export default routes