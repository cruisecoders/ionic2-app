import { Injectable, Pipe } from '@angular/core';

@Pipe({ name: 'rateTitlePipe' })
@Injectable()
export class RateTitlePipe {
    private refData: any = {
        ONE: "Guest 1",
        TWO: "Guest 2",
        THREE: "Guest 3",
        FOUR: "Guest 4"
    }
    transform(title: string) {
        return this.refData[title];
    }
}