import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Store} from '@ngxs/store';
import {ReceiveUpdateStatusAction} from '../state/update-status.state';

import {webSocket} from 'rxjs/webSocket';
import {WebPubSubServiceClient} from '@azure/web-pubsub';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AzurePubSubService {

  constructor(private store: Store,
              private toastrService: ToastrService) {
  }

  async initConnection(): Promise<any> {
    const serviceClient = new WebPubSubServiceClient(environment.pubsubConnectionString, environment.pubsubHubName);
    const token = await serviceClient.getAuthenticationToken();

    const wsSubject = webSocket({
      url: token.url,
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
      msg => {
          console.log('ws message received: %s', msg);
          this.store.dispatch(new ReceiveUpdateStatusAction({
            value: (msg).toString()
          }));
      },
        err => {
          console.log('ws error: %s', err);
          this.toastrService.error('ws connection error');
        }
    );

  }
}
