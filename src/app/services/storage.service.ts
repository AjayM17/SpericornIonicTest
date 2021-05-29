import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    storage.create()
   }

  setItem =  async (key,value) =>{
   return await this.storage.set(key,value)
  }

  getToken = async() =>{
    return await  this.storage.get('token')
  }

  clearAll= async () =>{
  await  this.storage.clear()
  }
}
