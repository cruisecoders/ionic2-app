import { BlankPage } from '../pages/blank-page/blank-page';
import { ContactUs } from '../pages/contact-us/contact-us';
import { BookingHistory } from '../pages/booking-history/booking-history';
import { Storage } from '@ionic/storage';
import { AuthService } from '../providers/auth-service';
import { PlaceBooking } from '../pages/place-booking/place-booking';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { AuthForm } from '../pages/auth-form/auth-form';
import { tokenNotExpired } from 'angular2-jwt';
import { Splashscreen } from 'ionic-native';

@Component({
  template: `
  <ion-menu [content]="content">
    <ion-header class="show-header">
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button class="nav-item-font-size" menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.display}}
        </button>
        <button class="nav-item-font-size" menuClose ion-item (click)="logout()">
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
  rootpage: any = BlankPage;
  pages: Array<{ display: string, title: string, component: any, rootParam: string }>;

  storage: Storage;

  constructor(platform: Platform,
    private authService: AuthService
  ) {
    this.storage = new Storage();

    platform.ready().then(() => {

      setTimeout(() => {
        Splashscreen.hide();
      }, 1000);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    this.pages = [
      { display: 'Home', title: 'Home', component: PlaceBooking, rootParam: "" },
      { display: 'My Bookings', title: 'Bookings', component: BookingHistory, rootParam: "" },
      { display: 'Contact us', title: 'Contact us', component: ContactUs, rootParam: "" }
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
    if (!isAuth) {
      this.nav.setRoot(AuthForm);
    } else {
      this.authService.setUserProfile();
      this.nav.setRoot(PlaceBooking, {
        title: 'Home'
      });
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
