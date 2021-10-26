import {Injectable} from '@angular/core';
import {environment} from './../../environments/environment';
import {Store} from '@ngxs/store';
import {ReceiveUpdateStatusAction} from '../state/update-status.state';

import {WebSocket} from 'ws';
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
    console.log('token url: ' + token.url);

    const ws = new WebSocket(token.url, 'json.webpubsub.azure.v1');

    ws.on('open', () => console.log('ws connected'));

    ws.on('message', data => {
      // const data = JSON.parse(event.data);
      console.log('Message received: %s', data);
      this.store.dispatch(new ReceiveUpdateStatusAction({
        value: (data).toString()
      }));
    });

    ws.on('error', error => {
      console.log('ws error: %s', error);
    });

    ws.on('close', close => {
      console.log('ws closed: %s', close);
    });
  }
}
