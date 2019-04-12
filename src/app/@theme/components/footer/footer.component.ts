import { Component } from '@angular/core';
import { AppConfig } from '../../../shared/config/app.config';

@Component({
  selector: 'ngx-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  version = AppConfig.version;
  year = AppConfig.year;
}
