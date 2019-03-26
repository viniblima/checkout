import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html'
})
export class SobrePage {
  imageUrl: string = 'assets/imgs/background.png'
  constructor(public navCtrl: NavController) {
  }
  
}
