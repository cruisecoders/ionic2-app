import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { LuggageBooking } from '../pages/luggage-booking/luggage-booking';

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
      </ion-list>
    </ion-content>

  </ion-menu>

    <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
  `
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LuggageBooking;

  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    this.pages = [
      { title: 'Luggage Booking', component: LuggageBooking },
      //{ title: 'Freshen Up Booking', component: TypeList },
      //{ title: 'About', component: AboutPage }
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    //this.nav.push(page.component); //temporary - ios bug
  }

}
