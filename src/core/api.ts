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

    // getRequestWithXHR<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    //     // 직접 URL을 받게
    //     this.xhr.open('GET', this.url);
    //     this.xhr.addEventListener('load', () => {
    //         cb(JSON.parse(this.xhr.response) as AjaxResponse); //JSON.parse는 동기적으로 작동함
    //     });
    //     this.xhr.send();
    // }

    async request<AjaxResponse>(): Promise<AjaxResponse> {
        const res = await fetch(this.url);
        return (await res.json()) as AjaxResponse;
    }
}

export class NewsFeedApi extends Api {
    constructor(url: string) {
        super(url);
    }

    // getDataWithXHR(cb: (data: NewsFeed[]) => void): void {
    //     return this.getRequestWithXHR<NewsFeed[]>(cb);
    // }

    async getData(): Promise<NewsFeed[]> {
        return this.request<NewsFeed[]>();
    }
}

export class NewsDetailApi extends Api {
    constructor(url: string) {
        super(url);
    }

    // getDataWithXHR(cb: (data: NewsDetail) => void): void {
    //     return this.getRequestWithXHR<NewsDetail>(cb);
    // }

    getData(): Promise<NewsDetail> {
        return this.request<NewsDetail>();
    }
}

// interface NewsFeedApi extends Api {}
// interface NewsDetailApi extends Api {}
// applyApiMixins(NewsFeedApi, [Api]);
// applyApiMixins(NewsDetailApi, [Api]);
