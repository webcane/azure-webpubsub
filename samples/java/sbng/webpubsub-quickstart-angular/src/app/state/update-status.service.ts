import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {ReceiveUpdateStatusAction} from './update-status.state';
import {Store} from '@ngxs/store';
import {UpdateResponse} from '../update.service';

export interface UpdateStatus {
  value: string;
}

export const STATUSES: UpdateStatus[] = [
  {
    value: 'PENDING'
  },
  {
    value: 'UPDATING'
  },
  {
    value: 'FINISHED'
  }
];


@Injectable({
  providedIn: 'root'
})
export class UpdateStatusService {
  private allStatuses$ = new ReplaySubject<UpdateStatus>(3);

  constructor(private store: Store) {
    setTimeout(() => {
      this.allStatuses$.next(STATUSES[0]);
    }, 1500);
    setTimeout(() => {
      this.allStatuses$.next(STATUSES[1]);
    }, 3500);
    setTimeout(() => {
      this.allStatuses$.next(STATUSES[2]);
    }, 7500);
  }

  get statuses$(): Observable<UpdateStatus> {
    return this.allStatuses$.asObservable();
  }

  public startUpdate(): Observable<UpdateResponse> {
    this.allStatuses$.asObservable().subscribe(value => {
      this.store.dispatch(new ReceiveUpdateStatusAction(value));
    });

    return new Observable<UpdateResponse>( observer => {
      observer.next( {
        response: 'enqueue an update'
      });
      observer.complete();
    });
  }
}
