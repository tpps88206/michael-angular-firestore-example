import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {

  constructor(
    protected ref: NbDialogRef<DialogComponent>) { }

  dismiss() {
    this.ref.close();
  }
}
