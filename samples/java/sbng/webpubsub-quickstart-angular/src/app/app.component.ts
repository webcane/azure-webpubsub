import {Component, OnInit} from '@angular/core';
import {UpdateResponse, UpdateService} from './update/update.service';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {AzurePubSubService} from './pubsub/azure-pub-sub.service';
import {HttpErrorResponse} from '@angular/common/http';
import {environment} from '../environments/environment';
import {CampaignsState, RemoveCampaignStatusesAction, SelectCampaignAction} from './campaigns/campaigns.state';
import {Campaign, CampaignsService} from './campaigns/campaigns.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Select(CampaignsState.listCampaigns)
  campaigns$: Observable<Campaign[]>;

  selectedCampaign: Campaign;

  isUpdateRunning = false;

  constructor(private store: Store,
              private updateService: UpdateService,
              private pubSubService: AzurePubSubService,
              private campaignsService: CampaignsService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.pubSubService.initConnection(environment.pubsubUserName)
        .then(success => {
          console.log(success);
        })
        .catch(error => {
          console.log(error);
        });
  }

  public runCampaignUpdate(): void {
    if (this.selectedCampaign === undefined) {
      this.toastrService.warning('select a campaign');
    }
    else {
      console.log('run update');
      this.isUpdateRunning = true;

      this.updateService.startUpdate(environment.pubsubUserName, this.selectedCampaign.campaignId)
        .subscribe((data: UpdateResponse) => {
          console.log(data);
          this.toastrService.success((data.response).toString(), '', {
            timeOut: 3000,
            progressBar: false,
            tapToDismiss: true
          });
        }, (error: HttpErrorResponse) => {
          this.isUpdateRunning = false;
          this.toastrService.error(error.message, 'start update error');
        }, () => {
          this.isUpdateRunning = false;
        });
    }
  }

  public cleanCampaignStatuses(): void {
    console.log('clean all campaign statuses');
    this.store.dispatch(new RemoveCampaignStatusesAction(this.selectedCampaign));
  }
}
