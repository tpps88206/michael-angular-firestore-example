import {Component, OnInit} from '@angular/core';
import {RecordModel} from '../../shared/model/record.model';
import {RecordService} from '../../shared/service/record.service';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe],
})
export class ListComponent implements OnInit {
  displayRecords = false;
  source: LocalDataSource;
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
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
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      date: {
        title: '日期',
        type: 'string',
        editable: false,
        addable: false,
        valuePrepareFunction: (v) => {
          return this.datePipe.transform(new Date(v.seconds * 1000 ), 'dd MMM yyyy');
        },
      },
      type: {
        title: '狀態',
        type: 'string',
      },
      value: {
        title: '金額',
        type: 'number',
        valuePrepareFunction: (v) => {
          return v > 0 ? v : v * -1;
        },
      },
      description: {
        title: '敘述',
        type: 'string',
      },
      user: {
        title: '人員',
        type: 'string',
      },
    },
  };

  constructor(
    private recordService: RecordService,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit() {
    this.source = new LocalDataSource();
    this.recordService.getRecords().subscribe((records) => {
      this.source.load(records);
    });
  }

  onCheck(record) {
    if (record.check) {
      const result = confirm('Are you sure to initialize this data?');
      if (result) {
        record.check = false;
      }
    } else {
      record.check = true;
    }
    this.recordService.updateRecord(record);
  }

}
