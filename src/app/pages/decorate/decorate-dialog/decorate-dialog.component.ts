import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-decorate-dialog',
  templateUrl: './decorate-dialog.component.html',
  styleUrls: ['./decorate-dialog.component.scss'],
})
export class DecorateDialogComponent {

  constructor(protected ref: NbDialogRef<DecorateDialogComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }
}
