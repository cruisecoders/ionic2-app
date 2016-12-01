import { AuthService } from '../../providers/auth-service';
import { User } from '../auth-form/user';
import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { Component, Inject, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'luggage-detail.html'
})
export class LuggageDetail implements OnInit {

  public place: any = {};
  public imgPath: string;
  public user: User;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    @Inject(APP_CONFIG) private config: AppConfig,
    private authService: AuthService
  ) { this.imgPath = config.apiImgEndPoint; }

  ngOnInit() {
    this.place = this.navParams.data.place;
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.user = this.authService.loaduserProfile();
  }

  getId(): number {
    return this.place.id;
  }

}
