import { PlaceLuggageConfirmDetail } from './place-luggage-confirm-detail/place-luggage-confirm-detail';
import { PlaceConfirmDetail } from './place-confirm-detail/place-confirm-detail';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { PlaceDetailFacilities } from './place-detail-facilities/place-detail-facilities';
import { PlaceDetailBrief } from './place-detail-brief/place-detail-brief';
import { PlaceLuggageForm } from './place-luggage-form/place-luggage-form';

const placeDetails = [
  PlaceDetailFacilities,
  PlaceDetailBrief,
  PlaceLuggageForm,
  PlaceConfirmDetail,
  PlaceLuggageConfirmDetail
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule
  ],
  declarations: [
    placeDetails
  ],
  exports: [
    placeDetails
  ],
  providers: [
  ]
})
export class PlaceDetailsModule { }
