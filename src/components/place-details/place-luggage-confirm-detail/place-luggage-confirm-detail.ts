import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'place-luggage-confirm-detail',
  templateUrl: 'place-luggage-confirm-detail.html'
})
export class PlaceLuggageConfirmDetail {

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
