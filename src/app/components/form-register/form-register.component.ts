import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserServiceService} from '../../services/user-service.service';

export interface StateRegister {
  email: any;
  password: any;
  emailTouched: boolean;
  passwordTouched: boolean;
}
@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})

export class FormRegisterComponent {
  form: FormGroup;
  kindForm = false;
  stateForm: StateRegister = {
    email: false,
    password: false,
    emailTouched: false,
    passwordTouched: false
  };
  constructor(private route: Router,
              private userService: UserServiceService) {
    if (route.url === '/register') {
      this.kindForm = true;
    }
    this.form = new FormGroup({
      email: new FormControl(null,
        [Validators.required, Validators.email]),
      password: new FormControl(null,
        [Validators.required,
          Validators.minLength(6)])
    });
  }
  changeForm(ev: boolean): void {
    this.kindForm = ev;
  }
  focus(): void {
    const controls = this.form.controls;
    this.stateForm.email = { ...controls.email.errors};
    this.stateForm.password = {...controls.password.errors};
    this.stateForm.emailTouched = controls.email.touched;
    this.stateForm.passwordTouched = controls.password.touched;
  }
  submit(): void {
    if (this.form.valid) {
     this.userService.registerUser({...this.form.value}, this.kindForm);
    }
  }
}
