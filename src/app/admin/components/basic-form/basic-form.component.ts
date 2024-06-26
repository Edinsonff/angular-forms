import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    // this.nameField.valueChanges
    //   .subscribe(value => {
    //     console.log(value)
    //   });
    //   this.form.valueChanges
    //   .subscribe(value => {
    //     console.log(value)
    //   });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      fullName :this.formBuilder.group ({
        name : ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]],
        last : ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]]
      }),
      email : ['', [Validators.required, Validators.email]],
      phone : ['', Validators.required],
      color : ['#000000'],
      date : [''],
      time : [''],
      url : [''],
      range : [''],
      age :['18',[Validators.required, Validators.min(18), Validators.max(100)]],
      category :[''],
      tag : [''],
      agree : [false, [Validators.requiredTrue]],
      gender : [''],
      zona : [''],
    })
  }

  getNameValue() {
    console.log(this.nameField.value);
  }

  get nameField() {
    return this.form.get('fullName.name');
  }
  get lastField() {
    return this.form.get('fullName.last');
  }

  get emailField() {
    return this.form.get('email');
  }

  get phoneField() {
    return this.form.get('phone');
  }

  get colorField(){
    return this.form.get('color');
  }

  get dateField() {
    return this.form.get('date');
  }

  get timeField() {
    return this.form.get('time');
  }

  get urlField() {
    return this.form.get('url');
  }

  get rangeField() {
    return this.form.get('range');
  }

  get ageField() {
    return this.form.get('age');
  }

  get categoryField() {
    return this.form.get('category');
  }

  get tagField() {
    return this.form.get('tag');
  }

  get agreeField() {
    return this.form.get('agree');
  }

  get genderField(){
    return this.form.get('gender')
  }

  get zonaField(){
    return this.form.get('zona')
  }

  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }

  get isLastFieldValid() {
    return this.lastField.touched && this.lastField.valid;
  }

  get isLastFieldInvalid() {
    return this.lastField.touched && this.lastField.invalid;
  }

  get isEmailFieldValid() {
    return this.emailField.touched && this.emailField.valid;
  }

  get isEmailFieldInvalid() {
    return this.emailField.touched && this.emailField.invalid;
  }

  get isPhoneValid(){
    return this.phoneField.touched && this.phoneField.valid;
  }
  get isPhoneInvalid(){
    return this.phoneField.touched && this.phoneField.invalid;
  }

  get isColorValid(){
    return this.colorField.touched && this.colorField.valid;
  }

  get isColorInvalid(){
    return this.colorField.touched && this.colorField.invalid;
  }

  get isDateValid(){
    return this.dateField.touched && this.dateField.valid;
  }

  get isDateInvalid(){
    return this.dateField.touched && this.dateField.invalid;
  }

  save(event) {
    if(this.form.valid) {
      console.log(this.form.value);
    }else {
      this.form.markAllAsTouched();
    }
  }
}
