import { CoreService } from './core-service';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LuggageService {


    constructor(private coreService: CoreService) {
    }

    public getCityByTag(tag: string): Observable<any> {
        return this.coreService.getResource('getCitiesByTag', this.getURLSearchParams("tag", tag));
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
}