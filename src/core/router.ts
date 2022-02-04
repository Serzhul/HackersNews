import { RouteInfo } from '../types';
import View from './view'; // default로 export 할 경우 이름을 지어줄 수 있지만 보통 같은 이름 사용

export default class Router {
    routeTable: RouteInfo[];
    defaultRoute: RouteInfo | null;
    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));

        this.routeTable = [];
        this.defaultRoute = null;
    }

    addRoutePath(path: string, page: View): void {
        this.routeTable.push({ path, page });
    }

    setDefaultPage(page: View): void {
        this.defaultRoute = { path: '', page };
    }

    route() {
        const routePath = location.hash;
        if (routePath === '' && this.defaultRoute) {
            this.defaultRoute.page.render('');
        }

        for (const routeInfo of this.routeTable) {
            if (routePath.indexOf(routeInfo.path) >= 0) {
                console.log(routePath);

                routeInfo.page.render(routePath.substr(7));
                break;
            }
        }
    }
}
