import { CityList } from '../components/place-list-item/city-list';
import { Loader } from '../components/loader/loader';
import { BlankPage } from './blank-page/blank-page';
import { ContactUs } from './contact-us/contact-us';
import { BookingHistory } from './booking-history/booking-history';
import { PlaceConfirm } from './place-confirm/place-confirm';
import { LuggageService } from '../providers/luggage-service';
import { CoreService } from '../providers/core-service';
import { SharedModule } from '../shared/shared.module';
import { AuthOTP } from './auth-form/auth-otp';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PlaceBooking } from '../pages/place-booking/place-booking';
import { AuthForm } from '../pages/auth-form/auth-form';
import { PlaceListItem } from '../components/place-list-item/place-list-item';
import { PlaceDetail } from '../pages/place-detail/place-detail';

import { PlaceDetailsModule } from '../components/place-details/place-details.module';

export const APP_PAGES = [
  PlaceBooking,
  PlaceDetail,
  PlaceConfirm,
  BookingHistory,
  AuthForm,
  AuthOTP,
  ContactUs,
  BlankPage,
  CityList,
  PlaceListItem
];

@NgModule({

  imports: [
    SharedModule,
    PlaceDetailsModule,
    IonicModule.forRoot(AuthForm),
    IonicModule.forRoot(AuthOTP),
    IonicModule.forRoot(PlaceBooking),
    IonicModule.forRoot(PlaceDetail),
    IonicModule.forRoot(PlaceConfirm),
    IonicModule.forRoot(BookingHistory),
    IonicModule.forRoot(ContactUs),
    IonicModule.forRoot(BlankPage),
    IonicModule.forRoot(CityList),
    IonicModule.forRoot(PlaceListItem)
  ],
  declarations: [
    APP_PAGES,
    Loader
  ],
  exports: [
    APP_PAGES
  ],
  providers: [CoreService, LuggageService]
})
export class PagesModule { }
