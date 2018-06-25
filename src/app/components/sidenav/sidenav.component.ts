import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DogsService } from '../../services/dogs.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  private searchUpdated = new BehaviorSubject('');
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private dogs: DogsService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.searchUpdated.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(val => this.dogs.searchByName(val));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onSearchType(value) {
    this.searchUpdated.next(value);
  }
}