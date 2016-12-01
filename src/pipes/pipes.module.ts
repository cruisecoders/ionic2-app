import { RateTitlePipe } from './rate-title-pipe';
import { FacilityPipe } from './facilityPipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [FacilityPipe, RateTitlePipe],
  exports: [FacilityPipe, RateTitlePipe]
})
export class PipesModule { }
