import {Component, OnInit} from '@angular/core';
import {UpdateResponse, UpdateService} from './update/update.service';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {CleanStatusesAction, UpdateStatus, UpdateStatusState} from './state/update-status.state';
import {AzurePubSubService} from './pubsub/azure-pub-sub.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Select(UpdateStatusState.getStatus)
  updateStatuses$: Observable<UpdateStatus>;

  public disableButton$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private store: Store,
              private updateService: UpdateService,
              private pubSubService: AzurePubSubService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.updateStatuses$.subscribe((value) => {
      console.log('new update status: ', value);
    });

    this.pubSubService.initConnection()
        .then(success => {
          console.log(success);
        })
        .catch(error => {
          console.log(error);
        });
  }

  public runUpdate(): void {
    console.log('run update');

    this.disableButton$.next(true);

    this.updateService.startUpdate()
      .subscribe((data: UpdateResponse) => {
        console.log(data);
        this.toastrService.success((data.response).toString(), '', {
          timeOut: 3000,
          progressBar: false,
          tapToDismiss: true
        });
    }, (error: HttpErrorResponse) => {
        this.disableButton$.next(false);
        this.toastrService.error(error.message, 'start update error');
    }, () => {
        this.disableButton$.next(false);
    });
  }

  public clean(): void {
    this.store.dispatch(new CleanStatusesAction());
  }

}
