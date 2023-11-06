import NProgress from 'nprogress';
import router from './router';
import 'nprogress/nprogress.css';
import { PageEnum } from './enums/pageEnum';
import { clearAuthInfo } from './utils/auth';
import useUserStore from './stores/modules/user';

NProgress.configure({ showSpinner: false });

const whiteList = [PageEnum.LOGIN, PageEnum.ERROR_404];
router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const userStore = useUserStore();
  if (userStore.isLogin) {
    const hasGetUserInfo = Object.keys(userStore.userInfo).length !== 0;
    if (hasGetUserInfo) {
      if (to.path === PageEnum.LOGIN) {
        next({ path: PageEnum.HOME });
      } else {
        next();
      }
    } else {
      try {
        await userStore.getUserInfo();
        const routes = userStore.routes;

        if (!routes.length) {
          await userStore.logout();
          next(PageEnum.ERROR_404);
          return;
        }

        routes.forEach((route) => {
          router.addRoute('/', route);
        });
        console.log('save', to);

        next({ ...to, replace: true });
      } catch (err) {
        clearAuthInfo();
        next({ path: PageEnum.LOGIN, query: { redirect: to.fullPath } });
      }
    }
  } else if (whiteList.includes(to.path)) {
    next();
  } else {
    next({ path: PageEnum.LOGIN, query: { redirect: to.fullPath } });
  }
});

router.afterEach(() => {
  // window.document.title = to.meta.title
  NProgress.done();
});