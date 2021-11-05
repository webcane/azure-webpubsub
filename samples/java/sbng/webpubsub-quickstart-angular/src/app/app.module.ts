import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CampaignsState} from './campaigns/campaigns.state';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    NgxsLoggerPluginModule.forRoot({
      logger: console,
      collapsed: environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([
      CampaignsState
    ], {
      developmentMode: true
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
      progressBar: true,
      tapToDismiss: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
