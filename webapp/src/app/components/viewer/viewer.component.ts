import {AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import InitializerOptions = Autodesk.Viewing.InitializerOptions;
import {ApiService} from "../../services/api.service";
import {TokenDto} from "../../dto/token.dto";
import {Observable} from "rxjs/Observable";
import {SnackService} from "../../services/snack.service";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewerComponent implements OnInit, OnDestroy {
  @ViewChild('viewerContainer') viewerContainer: any;
  private viewer: any;

  constructor(private ngZone: NgZone, private apiService: ApiService, private snackService: SnackService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.viewer && this.viewer.running) {
      this.viewer.tearDown();
      this.viewer.finish();
    }
  }

  public init() {
    this.apiService.getToken().catch(e => Observable.of(null)).subscribe(token => this.launchViewer(token));
  }

  private launchViewer(token: TokenDto) {
    if (this.viewer) return;
    const options: InitializerOptions = {
      env: 'AutodeskProduction',
      accessToken: token.access_token
    };

    this.viewer = new Autodesk.Viewing.Private.GuiViewer3D(this.viewerContainer.nativeElement);


    const documentUrn = __INSERT__DOCUMENT__URN__;

    this.ngZone.runOutsideAngular(() => Autodesk.Viewing.Initializer(
      options,
      () => Autodesk.Viewing.Document.load(documentUrn, doc => this.onDocumentLoadSuccess(doc),
        viewerErrorCode => this.onDocumentLoadFailure(viewerErrorCode))));

  }

  private onDocumentLoadSuccess(doc: Autodesk.Viewing.Document) {
    const viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {
      type: 'geometry'
    }, true);
    if (viewables.length === 0) {
      this.snackService.error('Документ не содержит моделей');
      return;
    }
    const initialViewable = viewables[0];
    const svfUrl = doc.getViewablePath(initialViewable);
    const modelOptions = {
      sharedPropertyDbPath: doc.getPropertyDbPath()
    };
    this.viewer.start(svfUrl, modelOptions, this.onLoadModelSuccess, this.onLoadModelError);
  }

  private onLoadModelSuccess(model) {

  }
  private onLoadModelError(viewerErrorCode) {
    this.snackService.error('Не удалось загрузить модель: ' + viewerErrorCode);
  }

  private onDocumentLoadFailure(viewerErrorCode: string) {
    this.snackService.error('Не удалось загрузить документ: ' + viewerErrorCode);
  }
}



