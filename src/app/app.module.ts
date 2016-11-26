import { CoreService } from '../providers/core-service';
import { API_CONFIG, APP_CONFIG } from './app-config';
import { AuthService } from '../providers/auth-service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { PagesModule, APP_PAGES } from '../pages/pages.module';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Storage } from '@ionic/storage';

let storage = new Storage();

export function getAuthHttp(http) {
    return new AuthHttp(new AuthConfig({
        //noJwtError: true,
        //globalHeaders: [{'Accept': 'application/json'}],
        //tokenName: 'myToken',
        tokenGetter: (() => storage.get('id_token'))
    }), http);
}

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        CommonModule,
        PagesModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        APP_PAGES,
        MyApp
    ],
    providers: [
        AuthService, CoreService,
        { provide: AuthHttp, useFactory: getAuthHttp, deps: [Http] },
        { provide: APP_CONFIG, useValue: API_CONFIG }
    ]
})
export class AppModule { }
