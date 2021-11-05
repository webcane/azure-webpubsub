import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';

import {Store} from '@ngxs/store';
import {LoadCampaignsAction} from './campaigns.state';
import {ToastrService} from 'ngx-toastr';
import {UpdateStatus} from '../pubsub/azure-pub-sub.service';

export interface Campaign {
  campaignId: number;
  name: string;
  statuses?: UpdateStatus[];
}

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  constructor(private store: Store,
              private httpClient: HttpClient,
              private toastrService: ToastrService) {
    this.httpClient.get<Campaign[]>(environment.apiUrl + `/campaigns`)
      .subscribe(data => {
        this.store.dispatch(new LoadCampaignsAction(data));
      }, (error: HttpErrorResponse) => {
        this.toastrService.error(error.message, 'failed to load campaigns');
      });
  }
}
