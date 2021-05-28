import { Injectable } from '@angular/core';
import { StorageService } from  '../services/storage.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = null
  constructor(private storageService: StorageService) {
   }

  async  isAuthenticated() {
      const val =  await this.storageService.getToken()
      this.token = val
     return this.token
  }
}
