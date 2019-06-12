import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { DecorateService } from '../../shared/service/decorate/decorate.service';
import { DecorateModel } from '../../shared/model/decorate.model';
import { DecorateDialogComponent } from './decorate-dialog/decorate-dialog.component';

@Component({
  selector: 'ngx-decorate',
  templateUrl: './decorate.component.html',
  styleUrls: ['./decorate.component.scss'],
})
export class DecorateComponent implements OnInit {

  decorates: DecorateModel[] = [];
  totalExpectantValue = 0;
  totalPracticalValue = 0;

  constructor(
    private decorateService: DecorateService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit() {
    this.decorateService.getDecorates().subscribe(
      (decorates) => {
        this.decorates = decorates;
        this.decorates.forEach(
          (decorate) => {
            this.totalExpectantValue = this.totalExpectantValue + decorate.expectant;
            this.totalPracticalValue = this.totalPracticalValue + decorate.practical;
          });
      });
  }

  open() {
    this.dialogService.open(DecorateDialogComponent)
      .onClose.subscribe(
        (name) => {
          // TODO: Modify decorate from dialog
        });
  }
}
