import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

@Component({
  selector: 'place-wall',
  templateUrl: 'place-wall.html',
})
export class PlaceWall {

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
