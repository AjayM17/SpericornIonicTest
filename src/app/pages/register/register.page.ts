/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../../custom-validation/custom-validation';
import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  emailRegx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  passwordRegx = new RegExp(/(?=.*?[#?!@$%^&*-]).{8,}$/);

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private storageService: StorageService) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['ajay@gmail.com', [Validators.required, Validators.pattern(this.emailRegx)]],
      name: ['ajay', Validators.required],
      phone: ['1111111111', Validators.required],
      password: ['111@1111', [Validators.required, Validators.pattern(this.passwordRegx)]],
      confirmPassword: ['111@1111', [Validators.required, passwordMatch]]
    });
  }

  get getFormControls() { return this.registerForm.controls; }

  registerUser = async () => {
    this.submitted = true;
    if (this.registerForm.valid) {
      const res = await this.checkEmailAlreadyExistOrNot()
      if(res['success']){
        const param = {
          email: this.registerForm.get('email').value,
          password: this.registerForm.get('password').value,
          username: this.registerForm.get('name').value,
          phone: this.registerForm.get('phone').value,
        };
        console.log(param)
        this.httpService.register(param).subscribe(res => {
          if(res['success']){
            this.storageService.setItem('token',res['data']['token'])
          }
        }, err => {
          console.log(err)
        })
      }
    }
  };

  checkEmailAlreadyExistOrNot = () => {
    const param = {
      email: this.registerForm.get('email').value
    };
    return this.httpService.checkEmail(param)
  };
}
