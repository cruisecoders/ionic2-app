import { Injectable, Pipe } from '@angular/core';

@Pipe({ name: 'bookingStatusPipe' })
@Injectable()
export class BookingStatusPipe {
    private refData: any = {
        Checkin_Date_Pending: "Upcoming",
        Checkin_Date_Done: "Checked in ",
        Checkin_Payment_Pending: "To be paid",
        Checkin_Payment_Done: "Paid",
        Checkin_Date_Cancelled: "Cancelled"
    }
    transform(title: string) {
        return this.refData[title];
    }
}