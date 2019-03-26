import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Servico } from '../../domain/servico/servico';
import { DescricaoPage } from '../descricao/descricao';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-servicos',
  templateUrl: 'servicos.html'
})
export class ServicosPage {
  imageUrl: string = 'assets/imgs/background.png'
  public servico: Servico[];

  constructor(
    public navCtrl: NavController,
    private _http: Http,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
    ){}
  
  ngOnInit(){
    console.log(sessionStorage.getItem("flagLogado"));
    if(sessionStorage.getItem("flagLogado") != "sim"){
      this.navCtrl.setRoot(LoginPage);
    }
    else{
      console.log("logado");
    }
    let loader = this._loadingCtrl.create({
      content: "Carregando serviços. Aguarde..."
    });
    loader.present();
    
    this._http
      .get('http://vservices.com.br/servicos/servicos/get_servicos')
      .map(res => res.json())
      .toPromise()
      .then(servicos =>{
        this.servico = servicos;
        loader.dismiss();
      })
      .catch(err =>{
        console.log(err);
        this._alertCtrl.create({
          title: "Falha na conexão",
          buttons: [{text: "OK"}],
          subTitle: "Não possível obter as áreas. Tente novamente."
        }).present();
      });

  }
  seleciona(servico){
    console.log("Selecionou serviço");
    this.navCtrl.push(DescricaoPage,{servicoSelecionado: servico});
  }
}
