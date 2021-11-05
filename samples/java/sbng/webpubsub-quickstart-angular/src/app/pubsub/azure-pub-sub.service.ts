import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Store} from '@ngxs/store';

import {webSocket} from 'rxjs/webSocket';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {ReceiveCampaignStatusAction} from '../campaigns/campaigns.state';

export interface NegotiateResponse {
  token: string;
}

export enum UpdateStatus {
  PENDING,
  UPDATING,
  FINISHED,
}

export interface CampaignStatus {
  campaignId: number;
  updateStatus: UpdateStatus;
}

@Injectable({
  providedIn: 'root'
})
export class AzurePubSubService {

  constructor(private httpClient: HttpClient,
              private store: Store,
              private toastrService: ToastrService) {
  }

  async initConnection(pubsubUserName: string): Promise<any> {
    const negotiateReq = await this.httpClient.get<NegotiateResponse>(
      environment.apiUrl + `/negotiate?id=${pubsubUserName}`).toPromise();

    const wsSubject = webSocket({
      url: negotiateReq.token,
      deserializer: ({data}) => data,
      openObserver: {
        next: () => {
          console.log('websocket connection ok');
        }
      },
      closeObserver: {
        next: (closeEvent) => {
          console.log(`websocket close connection. code: ${closeEvent.code}, reason: ${closeEvent.reason}`);
        }
      }
    });
    wsSubject.subscribe(
      data => {
          console.log('ws message received: %s', data);
          this.store.dispatch(new ReceiveCampaignStatusAction(JSON.parse(data)));
      },
        err => {
          console.log('ws error: %s', err);
          this.toastrService.error('ws connection error');
        }
    );

  }
}
