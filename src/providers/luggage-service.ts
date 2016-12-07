import { CoreService } from './core-service';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LuggageService {


    constructor(private coreService: CoreService) {
    }

    public getCityByTag(tag: string): Observable<any> {
        return this.coreService.getSecuredResource('getCitiesByTag', this.getURLSearchParams("tag", tag));
    }

    public getPlacesByCityAndPlaceType(city: any, placeType: string): Observable<any> {
        let params = this.getURLSearchParams("cityId", city.id);
        params.set("placeType", placeType);
        return this.coreService.getSecuredResource('getPlacesByCityIdAndType', params);
    }

    private getURLSearchParams(key: string, value: string): URLSearchParams {
        let params = new URLSearchParams();
        params.set(key, value);
        return params;
    }

    public getBookingsByUserId(id: number): Observable<any> {
        let params = new URLSearchParams();
        return this.coreService.getSecuredResource('getBookings/' + id, params);
    }

    public getContactUs(): Observable<any> {
        let params = new URLSearchParams();
        return this.coreService.getSecuredResource('getContactUs', params);
    }


    public submitBooking(booking: any): Observable<any> {
        return this.coreService.postSecuredResource('submitBooking', booking);
    }

    public cancelBooking(booking: any): Observable<any> {
        return this.coreService.postSecuredResource('cancelBooking/' + booking.id, {});
    }

    public getCities(): Observable<any> {
        let params = new URLSearchParams();
        return this.coreService.getSecuredResource('cities', params);
    }
}