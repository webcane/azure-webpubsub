import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import {Observable} from 'rxjs';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface UpdateResponse {
  response: string;
}


@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private httpClient: HttpClient) { }

  public startUpdate(): Observable<UpdateResponse|any> {
    return this.httpClient.get(environment.apiUrl + '/update/start');
      // .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
