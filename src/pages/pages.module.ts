import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { LuggageBooking } from '../pages/luggage-booking/luggage-booking';


import { Loader } from '../components/loader/loader';
import { PlaceListItem } from '../components/place-list-item/place-list-item';
import { LuggageDetail } from '../pages/luggage-detail/luggage-detail';

import { PlaceDetailsModule } from '../components/place-details/place-details.module';

export const APP_PAGES = [
  LuggageBooking,
  LuggageDetail
];

@NgModule({
    imports: [
      CommonModule,
      PlaceDetailsModule,
      IonicModule.forRoot(LuggageBooking),
      IonicModule.forRoot(LuggageDetail)
    ],
    declarations: [
      APP_PAGES,
      Loader,
      PlaceListItem
    ],
    exports: [
      APP_PAGES
    ],
    providers: []
})
export class PagesModule { }
