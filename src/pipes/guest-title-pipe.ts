import { Injectable, Pipe } from '@angular/core';

@Pipe({ name: 'guestTitlePipe' })
@Injectable()
export class GuestTitlePipe {
    private refData: any = {
        ONE_GUEST: "01",
        TWO_GUEST: "02",
        THREE_GUEST: "03",
        FOUR_GUEST: "04",
        ONE_BAG: "01",
        TWO_BAG: "02",
        THREE_BAG: "03",
        FOUR_BAG: "04",
    }
    transform(title: string) {
        return this.refData[title];
    }
}