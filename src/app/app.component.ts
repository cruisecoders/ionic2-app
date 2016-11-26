import { Storage } from '@ionic/storage';
import { AuthService } from '../providers/auth-service';
import { LuggageBooking } from '../pages/luggage-booking/luggage-booking';
import { Component, ViewChild, OnInit } from '@angular/core';
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
  pages: Array<{ title: string, component: any }>;

  storage: Storage;

  constructor(platform: Platform, private authService: AuthService) {
    this.storage = new Storage();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    this.pages = [
      { title: 'Luggage Booking', component: LuggageBooking }
    ];
  }

  ngOnInit() {
    let isAuth;
    this.storage.get('id_token').then(data => {
      isAuth = tokenNotExpired("id_token", data);
      this.getRootPage(isAuth);
    });
  }

  getRootPage(isAuth): any {
    if (isAuth) {
      this.rootpage = LuggageBooking;
    } else {
      this.rootpage = AuthForm;
    }
  }

  logout(): void {
    this.authService.logout();
    this.nav.setRoot(AuthForm);
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
