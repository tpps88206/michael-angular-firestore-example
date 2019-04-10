import {Component, OnInit} from '@angular/core';
import {RecordModel} from '../../shared/model/record.model';
import {RecordService} from '../../shared/service/record.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  records: RecordModel[];
  displayRecords = false;

  constructor(
    private recordService: RecordService,
  ) {
  }

  ngOnInit() {
    this.recordService.getRecords().subscribe((records: Array<RecordModel>) => {
      this.records = records;
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
