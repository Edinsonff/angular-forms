import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  // showCompany:boolean= false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.createUser(value.email, value.password)
      .then(() => {
        this.router.navigate(['/auth/login']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(6), MyValidators.validPassword]],
      confirmPassword: ['', [Validators.required]],
      type: ['company', [Validators.required]],
      companyName: ['', [Validators.required]],
      showCompany: [true, [Validators.required]]
    }, {
      validators: MyValidators.matchPasswords
    });

    this.typeField.valueChanges
    .subscribe(value =>{
      console.log(value);
      if(value === 'company'){
        this.companyNameField.setValidators([Validators.required])
        this.form.get('showCompany').setValue(true);
      }else{
        this.companyNameField.setValidators(null)
        this.form.get('showCompany').setValue(false);
      }
      this.companyNameField.updateValueAndValidity();
    });
  }

  get typeField(){
    return this.form.get('type');
  }

  get companyNameField(){
    return this.form.get('companyName');
  }

  get showCompany(){
    return this.form.get('showCompany').value;
  }
}
