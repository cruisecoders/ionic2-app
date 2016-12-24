import { AlertController, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: 'loader.html'
})
export class Loader {

  public loading: any;

  constructor(
    public alertController: AlertController,
    public loadingCtrl: LoadingController
  ){}

  public errorHandler(errorMessage) {
        if (errorMessage.data != undefined) {
            this.showAlert("Ooops", errorMessage.data);
        } else {
            this.showAlert("Ooops", "Please check your internet connection");
        }
    }

    public showAlert(title: string, subtitle: string): void {
        let alert = this.alertController.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    }

    public showLoader() {
      console.log("show loader");
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }

    public dismissLoader() {
        this.loading.dismiss();
    }
}
