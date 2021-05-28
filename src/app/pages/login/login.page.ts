import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  emailRegx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  passwordRegx = new RegExp(/(?=.*?[#?!@$%^&*-]).{8,}$/);

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private storageService: StorageService, private router: Router) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['ajay@gmail.com', [Validators.required, Validators.pattern(this.emailRegx)]],
      password: ['111@1111', Validators.required],
    });
  }

  get getFormControls() { return this.loginForm.controls; }

  loginUser = async () => {
    this.submitted = true;
    if (this.loginForm.valid) {
        const param = {
          email: this.loginForm.get('email').value,
          password: this.loginForm.get('password').value,
        };
        console.log(param)
        this.httpService.login(param).subscribe(res => {
          console.log(res)
          if(res['success']){
            this.storageService.setItem('login',true)
            // console.log(res['data']['token'])
            this.storageService.setItem('token',res['data']['token'])
            this.router.navigate(['/profile'])
          }
        }, err => {
          console.log(err)
        })
    }
  };

}
