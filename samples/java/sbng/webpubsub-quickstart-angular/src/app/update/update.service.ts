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

  public startUpdate(): Observable<UpdateResponse | any> {
    return this.httpClient.get(environment.apiUrl + '/update/start');
  }

}
