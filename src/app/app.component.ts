import { BookingHistory } from '../pages/booking-history/booking-history';
import { APP_CONFIG, AppConfig } from './app-config';
import { Storage } from '@ionic/storage';
import { AuthService } from '../providers/auth-service';
import { PlaceBooking } from '../pages/place-booking/place-booking';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { AuthForm } from '../pages/auth-form/auth-form';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  template: `
  <ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
        <button menuClose ion-item (click)="logout()">
          Logout
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  
  <ion-nav [root]="rootpage" #content swipeBackEnabled="false"></ion-nav>
  `
})
export class MyApp implements OnInit {

  @ViewChild(Nav) nav: Nav;
  rootpage: any = AuthForm;
  pages: Array<{ title: string, component: any, rootParam: string }>;

  storage: Storage;

  constructor(platform: Platform,
    private authService: AuthService,
    @Inject(APP_CONFIG) private apiConfig: AppConfig) {
    this.storage = new Storage();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    this.pages = [
      { title: 'Freshen up Booking', component: PlaceBooking, rootParam: this.apiConfig.FRESHENUP },
      { title: 'Luggage Booking', component: PlaceBooking, rootParam: this.apiConfig.LUGGAGE },
      { title: 'Booking Histoy', component: BookingHistory, rootParam: "" }
    ];
  }

  ngOnInit() {
    let isAuth;
    this.storage.get('jwt').then(data => {
      isAuth = tokenNotExpired("jwt", data);
      this.getRootPage(isAuth);
    });
  }

  getRootPage(isAuth): any {
    if (isAuth) {
      this.authService.setUserProfile();
      this.nav.setRoot(PlaceBooking, {
        config: this.apiConfig.FRESHENUP,
        title: 'Freshen up Booking'
      });
    } else {
      this.rootpage = AuthForm;
    }
  }

  logout(): void {
    this.authService.logout();
    this.nav.setRoot(AuthForm);
  }

  openPage(page) {
    this.nav.setRoot(page.component, {
      config: page.rootParam,
      title: page.title
    });
  }

}
