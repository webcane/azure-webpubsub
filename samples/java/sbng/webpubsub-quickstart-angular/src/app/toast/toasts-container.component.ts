import {Component, OnInit, TemplateRef} from '@angular/core';
import {ToastService} from './toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts-container.component.html',
  styleUrls: ['./toasts-container.component.css'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsContainerComponent implements OnInit {

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

  isTemplate(toast): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
