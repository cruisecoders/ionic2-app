import { BookingStatusPipe } from './booking-status-pipe';
import { GuestTitlePipe } from './guest-title-pipe';
import { RateTitlePipe } from './rate-title-pipe';
import { FacilityPipe } from './facilityPipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [FacilityPipe, RateTitlePipe, GuestTitlePipe, BookingStatusPipe],
  exports: [FacilityPipe, RateTitlePipe, GuestTitlePipe, BookingStatusPipe]
})
export class PipesModule { }
