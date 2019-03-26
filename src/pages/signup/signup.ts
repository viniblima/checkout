import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Usuario } from '../../domain/usuario/usuario';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  imageUrl: string = 'assets/imgs/background.png'
  public data;
  public http;
  public usuario: Usuario;

  constructor(
    public navCtrl: NavController,
    private _alertCtrl: AlertController,
    http: Http
  
  ){
    this.data = {};
    this.data.response = '';
    this.http = http;
    this.usuario = new Usuario(null,null,null,null,null);

  }

  submit(){
    var link = 'http://vservices.com.br/servicos/servicos/cadastrar_usuario';
    var data = JSON.stringify({
      nome: this.usuario.nome,
      email: this.usuario.email,
      password: this.usuario.password
    });

    this.http.post(link,data)
    .subscribe( data =>{
      this.data.response = data._body;
      console.log(this.usuario.email);
      if(this.data.response == " sucesso"){
        console.log("cadastrou");
        this.cadastroAlert();
        this.navCtrl.setRoot(LoginPage);
        
      }

    }, error =>{
      console.log("Ocorreu um erro!");
    });

  }
  cadastroAlert(){
    let alert = this._alertCtrl.create({
              title: 'Bem-vindo!',
              buttons: [{text: "OK"}],
              subTitle: 'Cadastro efetuado com sucesso!'
            });
            alert.present();
    }
  
}
