import {Campaign} from './campaigns.service';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {produce} from 'immer';
import {CampaignStatus} from '../pubsub/azure-pub-sub.service';

export interface CampaignModel {
  campaigns: Campaign[];
}

export class LoadCampaignsAction {
  static readonly type = '[Campaigns] load all';
  constructor(public campaigns: Campaign[]) {}
}

export class SelectCampaignAction {
  static readonly type = '[Campaigns] select campaign';
  constructor(public campaign: Campaign) {}
}

export class ReceiveCampaignStatusAction {
  static readonly type = '[Campaigns] receive new status';
  constructor(public campaignStatus: CampaignStatus) {}
}

export class RemoveCampaignStatusesAction {
  static readonly type = '[Campaigns] remove campaign statuses';
  constructor(public campaign: Campaign) {}
}

@State<CampaignModel>({
  name: 'campaigns',
  defaults: {
    campaigns: []
  }
})
@Injectable()
export class CampaignsState {

  @Selector()
  public static listCampaigns(state: CampaignModel): Campaign[] {
    return state.campaigns;
  }

  @Action(LoadCampaignsAction)
  private loadCampaigns(context: StateContext<CampaignModel>, { campaigns }: LoadCampaignsAction): void {
    context.setState(produce(draft => {
        console.log('load all campaigns: ' + JSON.stringify(campaigns));
        draft.campaigns = campaigns;
      })
    );
  }

  @Action(ReceiveCampaignStatusAction)
  private receiveStatus(context: StateContext<CampaignModel>, { campaignStatus }: ReceiveCampaignStatusAction): void {
    context.setState(produce(draft => {
        console.log('received new status: ' + JSON.stringify(campaignStatus));
        const targetCampaign = draft.campaigns.filter(x => x.campaignId === campaignStatus.campaignId)[0];
        if (targetCampaign.statuses === undefined) {
          targetCampaign.statuses = [];
        }
        targetCampaign.statuses.push(campaignStatus.updateStatus);
      })
    );
  }

  @Action(RemoveCampaignStatusesAction)
  private removeStatuses(context: StateContext<CampaignModel>, {campaign}: RemoveCampaignStatusesAction): void {
    context.setState(produce(draft => {
        console.log('drain all campaign statuses');
        const targetCampaign = draft.campaigns.filter(x => x.campaignId === campaign.campaignId)[0];
        targetCampaign.statuses.splice(0, targetCampaign.statuses.length);
      })
    );
  }
}
