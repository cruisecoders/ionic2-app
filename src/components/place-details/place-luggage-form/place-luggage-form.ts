import { Component, Input } from '@angular/core';

@Component({
  selector: 'place-luggage-form',
  templateUrl: 'place-luggage-form.html'
})
export class PlaceLuggageForm {
  
  @Input() place: any;
  @Input() dateLabel: String;
  
  currentDate: Date = new Date();
  startDate: String = this.currentDate.toISOString();
  selDate: String = this.currentDate.toISOString();
  endDate: String = this.getDate();
  selectedRate: any;
  rateList : any[] = [];
  user : {name : String} = {
    name : 'Gaurav'
  }
  totalAmount:number = 1234;

  constructor(){
     this.getRateList();
  }

  getDate(): String {
    let d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString();
  }

  getRateList(){
    console.log("ratelist");
    this.rateList = [
      {
        title : "Guest 1",
        price : 100
      },
       {
        title : "Guest 2",
        price : 150
      },
       {
        title : "Guest 3",
        price : 200
      },
       {
        title : "Guest 4",
        price : 250
      },
    ]

    //return rateList;
  }

  onSelect(i, rate){
    this.selectedRate = rate;
    console.log(this.selectedRate);
  }

}
