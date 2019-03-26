import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Http } from '@angular/http';
import { Usuario } from '../../domain/usuario/usuario';
import { ServicosPage } from '../servicos/servicos';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  imageUrl: string = 'assets/imgs/background.png'
  public data;
  public http;
  public usuario: Usuario;
  public sinal;
  public email: any;
  public senha: any;
  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    private _alertCtrl: AlertController,
    http: Http
  ) {
    this.data = {};
    this.data.response = '';
    this.http = http;
    this.usuario = new Usuario(null,null,null,null,null);

  }
  ngOnInit(){
    this.storageGetDados(this.usuario.email, this.usuario.password);
    if(sessionStorage.getItem('email') != null && sessionStorage.getItem('senha') != 'null'){
      this.submit(sessionStorage.getItem('email'),sessionStorage.getItem('senha'))
    }
    console.log(sessionStorage.getItem('email'));
    console.log(sessionStorage.getItem('senha'));
  }

  submit(email, senha){
    var id: string[];
    var link = 'http://vservices.com.br/servicos/servicos/login';
    var data = JSON.stringify({
      email: email,
      password: senha
    })
    
    this.http.post(link, data)
    .subscribe(data =>{
      this.data.response = data._body;
      var res = this.data.response.split("|");
      console.log(this.data.response);
      if(res[1] == "sucesso"){
        this.storageSetDados(this.usuario.email, this.usuario.password);
        
        console.log(this.data.response);
        sessionStorage.setItem("usuarioID", res[0]);
        id = sessionStorage.getItem("usuarioID").split(" ");
        console.log(sessionStorage.getItem("usuarioID"));
        sessionStorage.setItem("id",id[1]);
        console.log(sessionStorage.getItem("id"));
        sessionStorage.setItem("usuarioLogado", this.usuario.email);
        sessionStorage.setItem("flagLogado", "sim");
        this.navCtrl.setRoot(ServicosPage);
        
        console.log(sessionStorage.getItem("flagLogado"));
      }else
      if(this.data.response == " Email ou senha inválido"){
        
        this.loginAlert();
      }
    }, error =>{
      console.log("Ocorreu algum erro!");
    });
  }
  loginAlert(){
    let alert = this._alertCtrl.create({
      title: "Esqueceu a senha?",
      buttons:[{text: "OK"}],
      subTitle: "Login e/ou senha inválidos!"
      
    });
    alert.present();
  }

  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
  storageSetDados(email, senha){
    this.storage.set('email',email);
    this.storage.set('senha',senha);
   
  }
  storageGetDados(email,senha){

    this.storage.get('email').then( (data) =>{
      console.log(data);
      sessionStorage.setItem('email', data);
    });
    

    this.storage.get('senha').then( (senha) =>{
      console.log(senha)
      sessionStorage.setItem('senha', senha);
    });
    
    
  }
}
