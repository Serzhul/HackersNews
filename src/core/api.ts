import { NewsFeed, NewsDetail } from '../types/';

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
    xhr: XMLHttpRequest;

    constructor(url: string) {
        this.xhr = new XMLHttpRequest();
        this.url = url;
    }

    getRequestWithXHR<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
        // 직접 URL을 받게
        this.xhr.open('GET', this.url);
        this.xhr.addEventListener('load', () => {
            cb(JSON.parse(this.xhr.response) as AjaxResponse); //JSON.parse는 동기적으로 작동함
        });
        this.xhr.send();
    }

    getRequestWithPromise<AjaxResponse>(
        cb: (data: AjaxResponse) => void
    ): void {
        fetch(this.url)
            .then((res) => res.json())
            .then(cb)
            .catch(() => {
                console.error('데이터를 불러오지 못했습니다.');
            });
    }
}

export class NewsFeedApi extends Api {
    constructor(url: string) {
        super(url);
    }

    getDataWithXHR(cb: (data: NewsFeed[]) => void): void {
        return this.getRequestWithXHR<NewsFeed[]>(cb);
    }

    getDataWithPromise(cb: (data: NewsFeed[]) => void): void {
        return this.getRequestWithPromise<NewsFeed[]>(cb);
    }
}

export class NewsDetailApi extends Api {
    constructor(url: string) {
        super(url);
    }
    getDataWithXHR(cb: (data: NewsDetail) => void): void {
        return this.getRequestWithXHR<NewsDetail>(cb);
    }

    getDataWithPromise(cb: (data: NewsDetail) => void): void {
        return this.getRequestWithPromise<NewsDetail>(cb);
    }
}

// interface NewsFeedApi extends Api {}
// interface NewsDetailApi extends Api {}
// applyApiMixins(NewsFeedApi, [Api]);
// applyApiMixins(NewsDetailApi, [Api]);
