import { LoadingController } from 'ionic-angular';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: 'loader.html'
})
export class Loader {

  public loading: any = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  constructor(public loadingCtrl: LoadingController) { }

  public showLoader() {
    this.loading.present();
  }

  public closeLoader() {
    this.loading.dismiss();
  }

}
