import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterConfig } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { RecordService } from '../../shared/service/record.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, AfterViewInit {
  newItemForm: FormGroup;
  submitted = false;
  loadingMediumGroup = false;
  config: ToasterConfig;

  constructor(
    private recordService: RecordService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {
    document
      .getElementsByClassName('btn-group')[0]
      .getElementsByClassName('btn')[0]
      .classList
      .add('active');
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.newItemForm.controls;
  }

  init() {
    let type = 'expense';
    let user = '';
    let date = '';

    if (this.newItemForm) {
      // reset user
      user = this.newItemForm.value.user;
      // reset date
      date = this.newItemForm.value.date;
      // reset type button
      if (this.newItemForm.value.type.value === 'income') {
        type = 'income';
      } else {
        type = 'expense';
      }
    }

    // set form value
    this.newItemForm = this.formBuilder.group({
      value: new FormControl('', [Validators.required]),
      date: new FormControl(date, [Validators.required]),
      description: new FormControl(''),
      user: new FormControl(user, [Validators.required]),
      check: new FormControl(false),
      type: new FormControl(type),
    });
    // set submit type
    this.submitted = false;
  }

  submit() {
    this.submitted = true;
    this.loadingMediumGroup = true;

    // stop here if form is invalid
    if (this.newItemForm.invalid) {
      return;
    }

    // transfer value
    if (this.newItemForm.controls.type.value === 'expense') {
      this.newItemForm.patchValue({value: this.newItemForm.controls.value.value * -1});
    }
    this.recordService.createRecord(this.newItemForm.getRawValue()).then(
      () => {
        this.init();
        this.showToast(NbToastStatus.SUCCESS, '太棒了!', '帳目新增成功');
        this.loadingMediumGroup = false;
      },
      err => {
        console.error(err);
        this.showToast(NbToastStatus.DANGER, 'Oops..', '帳目新增失敗');
        this.loadingMediumGroup = false;
      },
    );
  }

  private showToast(type: NbToastStatus, title: string, body: string) {
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
