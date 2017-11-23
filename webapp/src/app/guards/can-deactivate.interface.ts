import {Observable} from "rxjs/Observable";

export interface ICanDeactivate {
    canDeactivate: () => Observable<boolean> | boolean
}