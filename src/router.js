/**
 * Created by chenpeiqing on 2017/6/26.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


const RouterConfigs = {
    routes: [
        {
            path: '/test',
            components: {
                default: require('./components/page/test.vue'),
            }
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            //component: resolve => require(['../components/common/Home.vue'], resolve),
            components: {
                default: require('./components/common/Home.vue'),
                Home: require('./components/common/Home.vue'),
            },
            children: [{
                path: '/usersmanage',
                components: {
                    default: require('./components/page/Usermanage.vue'),
                }
            },{
                path: '/adduser',
                components: {
                    default: require('./components/page/AddUser.vue'),
                }
            },{
                path: '/edituser',
                components: {
                    default: require('./components/page/EditUser.vue'),
                }
            }, {
                path: '/classmanage',
                components: {
                    default: require('./components/page/depot/ClassManage.vue'),
                }
            }, {
                path: '/depotstorage',
                components: {
                    default: require('./components/page/depot/DepotStorage.vue'),
                }
            }, {
                path: '/depotoutbound',
                components: {
                    default: require('./components/page/depot/DepotOutbound.vue'),
                }
            }, {
                path: '/addnewstorage',
                components: {
                    default: require('./components/page/depot/AddNewStorage.vue'),
                }
            }, {
                path: '/addnewoutbound',
                components: {
                    default: require('./components/page/depot/AddOutbound.vue'),
                }
            }, {
                path: '/fabricandaccessories',
                components: {
                    default: require('./components/page/depot/FabricAndAccessories.vue'),
                }
            },{
                path: '/demonthlybalance',
                components: {
                    default: require('./components/page/depot/DeMonthlyBalance.vue'),
                }
            },{
                path: '/productplan',
                components: {
                    default: require('./components/page/product/ProductPlan.vue'),
                }
            },{
                path: '/addtheme',
                components: {
                    default: require('./components/page/product/AddTheme.vue'),
                }
            },{
                path: '/taskcenter',
                components: {
                    default: require('./components/page/developmenttask/taskcenter.vue'),
                }
            },{
                path: '/carousel',
                components: {
                    default: require('./components/page/Carousel.vue'),
                }
            }],
        },
        {
            path: '/login',
            components: {
                default: require('./components/page/Login.vue'),
                Login: require('./components/page/Login.vue'),
            }
        },
    ],
};

const router = new VueRouter(RouterConfigs);

export default router;