import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-ajuda',
  templateUrl: 'ajuda.html'
})
export class AjudaPage {
  imageUrl: string = 'assets/imgs/background.png'

  constructor(public navCtrl: NavController) {
    
  }
  
}
