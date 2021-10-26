import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainerComponent } from './toast/toasts-container.component';
import { UpdateStatusState } from './state/update-status.state';
import { UpdateStatusService } from './state/update-status.service';

@NgModule({
  declarations: [
    AppComponent,
    ToastsContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgxsModule.forRoot([UpdateStatusState], { developmentMode: true })
  ],
  providers: [], // UpdateStatusService
  bootstrap: [AppComponent]
})
export class AppModule { }
