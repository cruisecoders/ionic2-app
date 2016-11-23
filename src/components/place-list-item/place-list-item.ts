import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'place-list-item',
  templateUrl: 'place-list-item.html',
})
export class PlaceListItem {

  @Input() place: any;
  @Output() clicked: EventEmitter<any> = new EventEmitter();

  goToPlaceDetail() {
    this.clicked.emit({ place: this.place });
  }
}
