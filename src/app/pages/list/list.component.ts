import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { RecordModel } from '../../shared/model/record.model';
import { RecordService } from '../../shared/service/record/record.service';
import { ToastService } from '../../@core/utils';
import { AppConfig } from '../../shared/config/app.config';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe],
})
export class ListComponent implements OnInit {
  source: LocalDataSource;
  settings = {
    actions: {
      add: false,
      edit: true,
      delete: false,
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      date: {
        title: '日期',
        type: 'string',
        filter: false,
        editable: false,
        valuePrepareFunction: (v) => {
          return this.datePipe.transform(new Date(v.seconds * 1000 ), 'dd MMM yyyy');
        },
      },
      value: {
        title: '金額',
        type: 'html',
        valuePrepareFunction: (v) => {
          return v > 0 ? '<div class="text-success">' + v + '</div>' : '<div class="text-danger">' + v * -1 + '</div>';
        },
      },
      description: {
        title: '敘述',
        type: 'string',
      },
      user: {
        title: '人員',
        type: 'string',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: AppConfig.users,
          },
        },
      },
      check: {
        title: '確認',
        type: 'html',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: [
              { value: true, title: '已確認' },
              { value: false, title: '未確認' },
            ],
          },
        },
        valuePrepareFunction: (v) => {
          return v ? '<div class="text-success"><i class="fas fa-check-circle"></i></div>'
            : '<div class="text-danger"><i class="fas fa-times-circle"></i></div>';
        },
      },
    },
  };

  constructor(
    private recordService: RecordService,
    private datePipe: DatePipe,
    private toastService: ToastService,
  ) {
  }

  ngOnInit() {
    this.source = new LocalDataSource();
    this.recordService.getRecords().subscribe((records) => {
      this.source.load(records);
    });
  }

  update(event: any) {
    // TODO: Fix Error: Element was not found in the dataset

    const data: RecordModel = event.newData;
    // edit type
    if (data.value >= 0) {
      data.type = 'income';
    } else {
      data.type = 'expense';
    }
    if (typeof data.check === 'string') {
      if (data.check === 'true') {
        data.check = true;
      } else if (data.check === 'false') {
        data.check = false;
      }
    }
    this.recordService.updateRecord(data).then(
      () => {
        event.confirm.resolve();
        this.toastService.show(NbToastStatus.SUCCESS, '太棒了!', '帳目修改成功');
      },
      err => {
        event.confirm.reject();
        this.toastService.show(NbToastStatus.DANGER, 'Oops..', '帳目修改失敗');
        console.error(err);
      },
    );
  }

}
