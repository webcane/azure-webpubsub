import { Action, Selector, State, StateContext } from '@ngxs/store';
import { produce } from 'immer';
import {STATUSES, UpdateStatus} from './update-status.service';
import {Injectable} from '@angular/core';

export interface UpdateStatusModel {
  statuses: UpdateStatus[];
}

export class ReceiveUpdateStatusAction {
  static readonly type = '[UpdateStatus] receive new status';
  constructor(public status: UpdateStatus) {}
}

export class CleanStatusesAction {
  static readonly type = '[UpdateStatus] remove all statuses';
  constructor() {}
}

@State<UpdateStatusModel>({
  name: 'updateStatus',
  defaults: {
    statuses: []
  }
})
@Injectable()
export class UpdateStatusState {

  @Selector()
  public static getStatus(state: UpdateStatusModel): UpdateStatus[] {
    return state.statuses;
  }

  @Action(ReceiveUpdateStatusAction)
  private receiveStatus(context: StateContext<UpdateStatusModel>, { status }: ReceiveUpdateStatusAction): void {
    context.setState(produce(draft => {
        console.log('received new status: ' + JSON.stringify(status));
        draft.statuses.push(status);
      })
    );
  }

  @Action(CleanStatusesAction)
  private removeStatuses(context: StateContext<UpdateStatusModel>): void {
    context.setState(produce(draft => {
        console.log('drain all statuses');
        draft.statuses.splice(0, draft.statuses.length);
      })
    );
  }
}
