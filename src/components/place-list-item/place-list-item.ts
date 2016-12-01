import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

@Component({
  selector: 'place-list-item',
  templateUrl: 'place-list-item.html',
})
export class PlaceListItem {

  @Input() place: any;
  @Output() clicked: EventEmitter<any> = new EventEmitter();

  public imgPath : string;

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    this.imgPath = config.apiImgEndPoint;
  }

  goToPlaceDetail() {
    this.clicked.emit({ place: this.place });
  }
}
