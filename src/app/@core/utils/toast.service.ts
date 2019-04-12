import { Injectable } from '@angular/core';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

@Injectable()
export class ToastService {

  config: ToasterConfig;

  constructor(
    private toastrService: NbToastrService,
  ) {}

  public show(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}
