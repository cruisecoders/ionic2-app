import { Injectable, Pipe } from '@angular/core';

@Pipe({ name: 'facilityPipe' })
@Injectable()
export class FacilityPipe {
    transform(facility: string) {
        return facility.replace(/_/g, " ");
    }
}