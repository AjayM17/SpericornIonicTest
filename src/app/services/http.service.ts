import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = 'https://devgroceryapi.spericorn.com/api/';
  constructor(private http: HttpClient) { }

  register=(param)=> this.http.post(`${this.baseUrl}auth/register`,param);

  login=(param)=> this.http.post(`${this.baseUrl}auth/login`,param);

  getProfile= () => this.http.get(`${this.baseUrl}user`)

  checkEmail= (param) => {
    console.log(param)
   return this.http.post(`${this.baseUrl}auth/checkMail`,param).toPromise()
  }
}
