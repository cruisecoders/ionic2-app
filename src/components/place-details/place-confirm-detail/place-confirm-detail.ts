import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'place-confirm-detail',
  templateUrl: 'place-confirm-detail.html'
})
export class PlaceConfirmDetail {

  @Input() booking: any;
  @Input() user: any;
  @Input() cancelActivity: string;

  @Output() clicked: EventEmitter<any> = new EventEmitter();

  constructor(
  ) { }

  cancelBooking(): void {
    this.clicked.emit();
  }

  backToPlaces(): void {
    console.log("Back to places");
  }

}
