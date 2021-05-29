import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'
import { StorageService } from '../../services/storage.service'
import { NavController } from '@ionic/angular'
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile :any ={}
  constructor(private httpService: HttpService, private authService: AuthService, private navctrl: NavController, private storageService: StorageService) { }

  ngOnInit() {
    this.httpService.getProfile().subscribe( data => {
      if(data['success']){
        this.profile = data['data']['userData']
      }
    })
  }

 async logOut(){
   await this.storageService.clearAll()
   this.authService.token = null
   this.navctrl.navigateRoot('login')
    console.log('data')
  }
}
