import {Component, Inject, OnInit} from '@angular/core';
import {UpdateResponse, UpdateService} from './update.service';
import {ToastService} from './toast/toast.service';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {STATUSES, UpdateStatus, UpdateStatusService} from './state/update-status.service';
import {CleanStatusesAction, ReceiveUpdateStatusAction, UpdateStatusState} from './state/update-status.state';
import {AzurePubSubService} from './pubsub/azure-pub-sub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Select(UpdateStatusState.getStatus)
  updateStatuses$: Observable<UpdateStatus>;

  constructor(private store: Store,
              private updateService: UpdateService,
              private updateStatusService: UpdateStatusService,
              private pubSubService: AzurePubSubService,
              public toastService: ToastService) {
  }


  ngOnInit(): void {
    this.updateStatuses$.subscribe(value => {
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
    this.updateService.startUpdate()
      .subscribe((data: UpdateResponse) => {
        console.log(data);
        this.toastService.show((data.response).toString(),
          {
            classname: 'bg-success text-light',
            delay: 3000
          });
      });

    // this.updateStatusService.startUpdate()
    //   .subscribe((data: UpdateResponse) => {
    //     console.log(data);
    //     this.toastService.show((data.response).toString(),
    //       { classname: 'bg-success text-light',
    //         delay: 3000 } );
    //   });
  }

  public clean(): void {
    this.store.dispatch(new CleanStatusesAction());
  }

}
