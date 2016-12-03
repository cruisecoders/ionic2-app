import { Injectable, Pipe } from '@angular/core';

@Pipe({ name: 'rateTitlePipe' })
@Injectable()
export class RateTitlePipe {
    private refData: any = {
        ONE_GUEST: "Guest 1",
        TWO_GUEST: "Guest 2",
        THREE_GUEST: "Guest 3",
        FOUR_GUEST: "Guest 4",
        ONE_BAG: "1 Bag",
        TWO_BAG: "2 Bag",
        THREE_BAG: "3 Bag",
        FOUR_BAG: "4 Bag",
    }
    transform(title: string) {
        return this.refData[title];
    }
}