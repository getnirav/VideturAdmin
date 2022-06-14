import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { MatSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.css']
})
export class SpinnerOverlayComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  loadingSubscription!: Subscription;
  constructor(private loaderService: SpinnerOverlayService) {

    this.loadingSubscription = this.loaderService.isLoading.subscribe((v) => {
      // console.log(v);
      this.loading = v;
    });

  }
  ngOnDestroy(): void {
    if (!this.loadingSubscription.closed)
      this.loadingSubscription.unsubscribe();
  }
  ngOnInit() {
  }

}