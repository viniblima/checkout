import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ServicosPage } from '../pages/servicos/servicos';
import { HistoricoPage } from '../pages/historico/historico';
import { SobrePage } from '../pages/sobre/sobre';
import { AjudaPage } from '../pages/ajuda/ajuda';
import { SignupPage } from '../pages/signup/signup';


import { LoginPage } from '../pages/login/login';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = ServicosPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToServicos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ServicosPage);
  }goToHistorico(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HistoricoPage);
  }goToSobre(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SobrePage);
  }goToAjuda(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AjudaPage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  }goToSignup(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SignupPage);
  }
}
