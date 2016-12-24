import { Loader } from '../../components/loader/loader';
import { LuggageService } from '../../providers/luggage-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'contact-us',
  templateUrl: 'contact-us.html'
})

export class ContactUs implements OnInit {

  @ViewChild(Loader)
  public loader: Loader;

  public showList: boolean = true;
  public title: string;
  errorMessage: any;
  public ContactList: any[] = [];

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private luggageService: LuggageService
  ) {
  }

  ngOnInit() {
    this.title = this.navParams.data.title;
    this.getContactUs();
  }

  getContactUs(): void {
    this.loader.showLoader();
    this.luggageService.getContactUs().subscribe(
      data => {
        this.ContactList = data;
        this.loader.dismissLoader();
      },
      error => {
        this.errorMessage = <any>error;
        this.loader.errorHandler(this.errorMessage);
        this.loader.dismissLoader();
      }
    )
  }
}
