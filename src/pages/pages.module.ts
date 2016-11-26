import { CoreService } from '../providers/core-service';
import { SharedModule } from '../shared/shared.module';
import { AuthOTP } from './auth-form/auth-otp';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LuggageBooking } from '../pages/luggage-booking/luggage-booking';
import { AuthForm } from '../pages/auth-form/auth-form';

import { Loader } from '../components/loader/loader';
import { PlaceListItem } from '../components/place-list-item/place-list-item';
import { LuggageDetail } from '../pages/luggage-detail/luggage-detail';

import { PlaceDetailsModule } from '../components/place-details/place-details.module';

export const APP_PAGES = [
  LuggageBooking,
  LuggageDetail,
  AuthForm,
  AuthOTP
];

@NgModule({
  imports: [
    SharedModule,
    PlaceDetailsModule,
    IonicModule.forRoot(AuthForm),
    IonicModule.forRoot(AuthOTP),
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
  providers: [CoreService]
})
export class PagesModule { }
