import { NewsFeed, NewsDetail } from "../types/";

// function applyApiMixins(targetClass: any, baseClasses: any[]): void {
//   baseClasses.forEach((baseClass) => {
//     Object.getOwnPropertyNames(baseClass.prototype).forEach((name) => {
//       const descriptor = Object.getOwnPropertyDescriptor(
//         baseClass.prototype,
//         name
//       );

//       if (descriptor) {
//         Object.defineProperty(targetClass.prototype, name, descriptor);
//       }
//     });
//   });
// }

export class Api {
  url: string;
  ajax: XMLHttpRequest;

  constructor(url: string) {
    this.url = url;
    this.ajax = new XMLHttpRequest();
  }

  getRequest<AjaxResponse>(): AjaxResponse {
    // 직접 URL을 받게

    this.ajax.open("GET", this.url, false);
    this.ajax.send();

    return JSON.parse(this.ajax.response);
  }
}

export class NewsFeedApi extends Api {
  getData(): NewsFeed[] {
    return this.getRequest<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  getData(): NewsDetail {
    return this.getRequest<NewsDetail>();
  }
}

// interface NewsFeedApi extends Api {}
// interface NewsDetailApi extends Api {}
// applyApiMixins(NewsFeedApi, [Api]);
// applyApiMixins(NewsDetailApi, [Api]);
