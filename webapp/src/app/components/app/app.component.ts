import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SnackService} from "../../services/snack.service";
import {ApiService} from "../../services/api.service";
import {ViewerComponent} from "../viewer/viewer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(ViewerComponent) viewer:ViewerComponent;

  constructor(private snackService: SnackService, private apiService: ApiService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.apiService.init();
    this.viewer.init();
  }
}
