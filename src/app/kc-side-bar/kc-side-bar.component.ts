import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'kc-side-bar',
  templateUrl: './kc-side-bar.component.html',
  styleUrls: ['./kc-side-bar.component.css']
})
export class KcSideBarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  fillerNav = ['formulario dinamico'];

  
  private mobileQueryListener: () => void;
  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
