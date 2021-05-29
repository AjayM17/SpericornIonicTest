/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../../custom-validation/custom-validation';
import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router'

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

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private storageService: StorageService,private router: Router) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegx)]],
      confirmPassword: ['', Validators.required]
    },{ 
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  get getFormControls() { return this.registerForm.controls; }

  registerUser = async () => {
    this.submitted = true;
    if (this.registerForm.valid) {
      const check_res = await this.checkEmailAlreadyExistOrNot()
      console.log(check_res)
      if(check_res['success']){
        const param = {
          email: this.registerForm.get('email').value,
          password: this.registerForm.get('password').value,
          username: this.registerForm.get('name').value,
          phone: this.registerForm.get('phone').value,
        };
        console.log(param)
        this.httpService.register(param).subscribe(async res => {
          console.log(res)
          if(res['success']){
          await  this.storageService.setItem('token',res['data']['token'])
            this.router.navigate(['/profile'])
          }else {
            alert(res['message'])
          }
        }, err => {
          console.log(err)
        })
      } else {
        alert(check_res['message'])
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
