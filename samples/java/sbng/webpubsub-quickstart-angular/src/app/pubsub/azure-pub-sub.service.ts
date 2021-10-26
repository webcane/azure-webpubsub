import {Injectable} from '@angular/core';
import {environment} from './../../environments/environment';
import {Store} from '@ngxs/store';
import {ReceiveUpdateStatusAction} from '../state/update-status.state';

// import {WebSocket} from 'ws';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {WebPubSubServiceClient} from '@azure/web-pubsub';

@Injectable({
  providedIn: 'root'
})
export class AzurePubSubService {

  constructor(private store: Store) {
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
          const customError = { code: 6666, reason: 'Custom evil reason' };
          console.log(`code: ${customError.code}, reason: ${customError.reason}`);
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
        }
    );

  }
}
