import { NewsFeed, NewsStore } from './types';

export default class Store implements NewsStore {
    private feeds: NewsFeed[];
    private _currentPage: number;

    constructor() {
        this.feeds = [];
        this._currentPage = 1;
    }

    // currentPage는 속성으로 숫자값임. 내부에선 함수로, 외부에선 속성처럼 보이게 하는 문법이 getter setter

    get currentPage() {
        return this._currentPage;
    }

    set currentPage(page: number) {
        if (page <= 0) return;
        this._currentPage = page;
    }

    get nextPage(): number {
        return this._currentPage + 1;
    }

    get prevPage(): number {
        return this._currentPage > 1 ? this._currentPage - 1 : 1;
    }

    get numberOfFeed(): number {
        return this.feeds.length;
    }

    get hasFeeds(): boolean {
        return this.feeds.length > 0;
    }

    getAllFeeds(): NewsFeed[] {
        return this.feeds;
    }

    getFeed(position: number): NewsFeed {
        return this.feeds[position];
    }

    setFeeds(feeds: NewsFeed[]): void {
        this.feeds = feeds.map((feed) => ({
            ...feed,
            read: false,
        }));
    }

    makeRead(id: number): void {
        const feed = this.feeds.find((feed: NewsFeed) => feed.id === id);

        if (feed) {
            feed.read = true;
        }
    }
}
