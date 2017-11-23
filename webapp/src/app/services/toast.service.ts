import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {ToastOptions} from "ng2-toastr";

@Injectable()
export class ToastService {
  private subject: Subject<ToastData> = new Subject<ToastData>();

  public toastObservable: Observable<ToastData> = this.subject.asObservable();

  constructor() {
  }

  public info(message: string, title?: string, options?: ToastOptions) {
    this.makeToast('info', message, title, options);
  }

  public error(message: string, title?: string, options?: ToastOptions) {
    this.makeToast('error', message, title, options);
  }

  public success(message: string, title?: string, options?: ToastOptions) {
    this.makeToast('success', message, title, options);
  }

  public warning(message: string, title?: string, options?: ToastOptions) {
    this.makeToast('warning', message, title, options);
  }

  private makeToast(type: any, message: any, title: any, options?: ToastOptions) {
    this.subject.next({type: type, message: message, title: title, options: options} as ToastData);
  }

  public get errorToastOptions(): ToastOptions {
    const errorToastOptions = new ToastOptions();
    errorToastOptions.toastLife = 10000;
    errorToastOptions.showCloseButton = true;
    return errorToastOptions;
  }
}

export interface ToastData {
  options: ToastOptions;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
  title: string;
}
