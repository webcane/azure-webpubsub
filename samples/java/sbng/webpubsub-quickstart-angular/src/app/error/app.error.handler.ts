import {ErrorHandler, Inject, Injectable, Injector} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class AppErrorHandler extends ErrorHandler {

  constructor(@Inject(Injector) private injector: Injector) {
    super();
  }

  // Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  public handleError(error: HttpErrorResponse): void {
    let errorMessage = 'Unknown error!';

    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error: ${error.message}`;
    }
    this.toastrService.error(errorMessage, 'start update error');

    super.handleError(error);
  }
}
