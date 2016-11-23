import { Component, Input } from '@angular/core';

@Component({
  selector: 'place-detail-brief',
  templateUrl: 'place-detail-brief.html'
})
export class PlaceDetailBrief {

  @Input() place: any;

  constructor(
  ) {}

}
