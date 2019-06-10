import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { RecordService } from '../../shared/service/record/record.service';
import { ToastService } from '../../@core/utils';
import { UserService } from '../../shared/service/user/user.service';
import { UserModel } from '../../shared/model/user.model';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, AfterViewInit {
  newItemForm: FormGroup;
  submitted = false;
  loadingMediumGroup = false;
  users: UserModel[] = [];

  constructor(
    private recordService: RecordService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.init();
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      });
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
        this.toastService.show(NbToastStatus.SUCCESS, '太棒了!', '帳目新增成功');
        this.loadingMediumGroup = false;
      },
      err => {
        console.error(err);
        this.toastService.show(NbToastStatus.DANGER, 'Oops..', '帳目新增失敗');
        this.loadingMediumGroup = false;
      },
    );
  }
}
