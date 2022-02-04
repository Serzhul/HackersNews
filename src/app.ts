// const container: HTMLElement | null = document.getElementById("root"); // Union Type
// const ajax: XMLHttpRequest = new XMLHttpRequest(); // let => 다른 값을 할당할 수 있음
// const content = document.createElement("div");

import Router from './core/router';
import { NewsFeedView, NewsDetailView } from './page';
import Store from './store';

const store = new Store();

const router: Router = new Router();
const newsFeedView = new NewsFeedView('root', store);
const newsDetailView = new NewsDetailView('root', store);

router.setDefaultPage(newsFeedView);
router.addRoutePath('/page/', newsFeedView);
router.addRoutePath('/show/', newsDetailView);

router.route();
