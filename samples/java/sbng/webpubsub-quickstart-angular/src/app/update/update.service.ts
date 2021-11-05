import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

export interface UpdateResponse {
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private httpClient: HttpClient) {
  }

  public startUpdate(pubsubUserName: string, campaignId: number): Observable<UpdateResponse> {
    return this.httpClient.post<UpdateResponse>(environment.apiUrl + `/update/start`,
      {
        userName: pubsubUserName,
        campaignId
      });
  }

}
