import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {WindowService} from "../../services/window.service";

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit, OnDestroy {
  @Input() title: string = null;
  @Input() closeButton: boolean = true;
  private _order = 0;
  public collapsed = false;

  constructor(private windowService: WindowService) {
    windowService.register(this);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.windowService.unregister(this);
  }

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
    console.log(this.title, value);
  }
}
