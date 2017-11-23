import {Injectable} from "@angular/core";
import {WindowComponent} from "../components/window/window.component";
import * as _ from 'lodash';

@Injectable()
export class  WindowService {
  private windowComponents: WindowComponent[] = [];

  public register(windowComponent: WindowComponent) {
    this.windowComponents.push(windowComponent);
  }

  public unregister(windowComponent: WindowComponent) {
    this.windowComponents.splice(this.windowComponents.indexOf(windowComponent),1);
  }

  public setTopmost(windowComponent: WindowComponent) {
    windowComponent.order = _.maxBy(this.windowComponents, x => x.order).order + 1;
  }
}
