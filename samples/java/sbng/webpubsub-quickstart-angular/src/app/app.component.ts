import {Component, OnInit, EventEmitter} from '@angular/core';
import {UpdateResponse, UpdateService} from './update/update.service';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {CleanStatusesAction, UpdateStatus, UpdateStatusState} from './state/update-status.state';
import {AzurePubSubService} from './pubsub/azure-pub-sub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Select(UpdateStatusState.getStatus)
  updateStatuses$: Observable<UpdateStatus>;

  public reenableButton = new EventEmitter<boolean>(false);

  constructor(private store: Store,
              private updateService: UpdateService,
              private pubSubService: AzurePubSubService,
              public toastrService: ToastrService) {
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
    this.updateService.startUpdate()
      .subscribe((data: UpdateResponse) => {
        console.log(data);
        this.toastrService.success((data.response).toString(), '', {
          timeOut: 3000,
          progressBar: false,
          tapToDismiss: true
        });
      }, () => {
        this.reenableButton.emit(false);
      }, () => {
        this.reenableButton.emit(false);
      });
  }

  public clean(): void {
    this.store.dispatch(new CleanStatusesAction());
  }

}
