import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UpdateStatusState} from './state/update-status.state';
import {ToastrModule} from 'ngx-toastr';
import {AppErrorHandler} from './error/app.error.handler';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    NgxsModule.forRoot([UpdateStatusState], {
      developmentMode: true
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
      progressBar: true,
      tapToDismiss: false
    })
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: AppErrorHandler
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
