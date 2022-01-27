// const container: HTMLElement | null = document.getElementById("root"); // Union Type
// const ajax: XMLHttpRequest = new XMLHttpRequest(); // let => 다른 값을 할당할 수 있음
// const content = document.createElement("div");

import { Store } from "./types";
import Router from "./core/router";
import { NewsFeedView, NewsDetailView } from "./page";

export const store: Store = {
  currentPage: 1,
  feeds: [],
};

declare global {
  interface Window {
    store: Store;
  }
}

window.store = store;

const router: Router = new Router();
const newsFeedView = new NewsFeedView("root");
const newsDetailView = new NewsDetailView("root");

router.setDefaultPage(newsFeedView);
router.addRoutePath("/page/", newsFeedView);
router.addRoutePath("/show/", newsDetailView);

router.route();
