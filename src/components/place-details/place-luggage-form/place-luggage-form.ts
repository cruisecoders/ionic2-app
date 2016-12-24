import { AlertController } from 'ionic-angular';
import { User } from '../../../pages/auth-form/user';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'place-luggage-form',
  templateUrl: 'place-luggage-form.html'
})
export class PlaceLuggageForm implements OnInit {

  @Input() place: any;
  @Input() dateLabel: String;
  @Input() user: User;
  @Input() guestMsg: string;
  @Input() roomLeftMsg: string;
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Output() dateChangedEvent: EventEmitter<any> = new EventEmitter();

  currentDate: Date = new Date();
  startDate: String = this.currentDate.toISOString();
  selDate: String = this.currentDate.toISOString();
  endDate: String = this.getDate();
  selectedRate: any = new Object();
  updatedUser: { name: string, number: number } = { name: '', number: 0 };
  displayName: string;

  constructor(private alertController: AlertController) {
  }

  ngOnInit() {
    this.selectedRate = this.place.rooms[0].rates[0];
    this.displayName = this.user.firstName;
  }

  public notifyChild() {
    setTimeout(() => {
      this.selectedRate = this.place.rooms[0].rates[0];
    }, 300);
  }

  getDate(): String {
    let d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString();
  }

  goToPlaceDetail() {
    this.clicked.emit({ place: this.place });
  }

  onSelect(i, rate) {
    this.selectedRate = rate;
  }

  confirmBooking() {
    this.clicked.emit({ rate: this.selectedRate, date: this.selDate, updatedUser: this.updatedUser });
  }

  dateChanged(selDate: any) {
    if (selDate == this.startDate) {
      console.log("same");
    } else {
      console.log("diff");
      this.dateChangedEvent.emit({ onDate: selDate });
    }
  }

  showUserDetail(): void {
    let prompt = this.alertController.create({
      cssClass: 'edit-user-detail-alert',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Enter Guest Name'
        },
        {
          name: 'number',
          type: 'number',
          placeholder: 'Enter Mobile Number'
        },
      ],
      buttons: [
        {
          text: 'Discard',
          handler: data => {
            console.log('Cancel clicked');
            this.updatedUser = { name: '', number: 0 };
            this.displayName = this.user.firstName;
          }
        },
        {
          text: 'Update Details',
          handler: data => {
            let numberRegex = new RegExp('[0-9]+');
            let nameRegex = new RegExp('[a-zA-Z ]*');
            if (data.name == undefined || data.name == null || data.name == '') {
              console.log('invalid name');
              return false;
            }

            if (data.number == undefined || data.number == null || data.number == '') {
              console.log('invalid number');
              return false;
            }

            if (data.number.toString().length != 10) {
              console.log('number length should be 10');
              return false;
            }

            if (numberRegex.test(data.number) && nameRegex.test(data.name)) {
              this.updatedUser = { name: data.name, number: data.number };
              this.displayName = data.name;
              return true;
            }

            console.log('invalid userdetail');

            return false;

          }
        }
      ]
    });
    prompt.present();
  }

}
