import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecordService} from '../../shared/service/record.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  newItemForm: FormGroup;
  submitted = false;

  constructor(
    private recordService: RecordService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.init();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.newItemForm.controls;
  }

  init() {
    let user = '';
    if (this.newItemForm) {
      user = this.newItemForm.value.user;
    }
    this.submitted = false;
    this.newItemForm = this.formBuilder.group({
      value: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      user: new FormControl(user, [Validators.required]),
      check: new FormControl(false),
    });
  }

  setItemUser(userName: string) {
    this.newItemForm.patchValue({user: userName});
  }

  onSubmit(type: string) {
    this.submitted = true;
    this.newItemForm.patchValue({date: new Date()});

    // stop here if form is invalid
    if (this.newItemForm.invalid) {
      return;
    }
    // transfer value
    if (type === 'expenses') {
      this.newItemForm.patchValue({value: this.newItemForm.controls.value.value * -1});
    }
    this.recordService.createRecord(this.newItemForm.getRawValue()).then(
      () => {
        this.init();
      },
      err => {
        console.error(err);
      },
    );
  }
}
