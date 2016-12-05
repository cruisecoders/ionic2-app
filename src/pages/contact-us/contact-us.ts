import { LuggageService } from '../../providers/luggage-service';
import { Component, Inject, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'contact-us',
  templateUrl: 'contact-us.html'
})

export class ContactUs implements OnInit {

  public showList: boolean = true;
  public title: string;
  errorMessage: any;
  public loading: any;
  public ContactList: any[] = [];

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private luggageService: LuggageService,
    public loadingCtrl: LoadingController,
    private alertController: AlertController,
  ) {
  }

  ngOnInit() {
    this.title = this.navParams.data.title;
    this.getContactUs();
  }

  getContactUs(): void {
    this.showLoader();
    this.luggageService.getContactUs().subscribe(
      data => {
        this.ContactList = data;
        this.dismissLoader();
      },
      error => {
        this.errorMessage = <any>error;
        this.errorHandler();
        this.dismissLoader();
      }
    )
  }

  private errorHandler() {
    if (this.errorMessage.data != undefined) {
      this.showAlert("Ooops", this.errorMessage.data);
    } else {
      this.showAlert("Ooops", "Something Wrong. Please try again.");
    }
  }

  showAlert(title: string, subtitle: string): void {
    let alert = this.alertController.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  private showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  private dismissLoader() {
    this.loading.dismiss();
  }
}
