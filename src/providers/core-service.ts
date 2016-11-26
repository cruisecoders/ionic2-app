import { APP_CONFIG, AppConfig } from '../app/app-config';
import { Inject, Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CoreService {

    private api: string;

    constructor( @Inject(APP_CONFIG) config: AppConfig, private http: Http) {
        this.api = config.apiEndpoint;
    }

    public getResource(url: string, params: URLSearchParams): Observable<any> {
        return this.http.get(this.api + url, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    public postResource(url: string, data): Observable<any> {
        return this.http.post(this.api + url, data, {})
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

}