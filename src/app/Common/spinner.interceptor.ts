import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerOverlayService } from './spinner-overlay.service';

import { finalize } from 'rxjs/operators';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: SpinnerOverlayService,
    private alertify: AlertifyService, private Authguardservice: AuthService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let value = this.Authguardservice.getAuthtoken();
    const req = request.clone({
      headers: request.headers.set(
        'Authorization',
        'Bearer ' + value
      )
    });


    this.requests.push(req);

    // console.log("No of requests--->" + this.requests.length);

    this.loaderService.isLoading.next(true);
    return Observable.create((observer: { next: (arg0: HttpResponse<any>) => void; error: (arg0: any) => void; complete: () => void; }) => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            this.alertify.error('Internal Server Error.');
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}