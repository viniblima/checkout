import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Pedido } from '../../domain/pedido/pedido';
import { PedidoDescritoPage } from '../pedido-descrito/pedido-descrito';

@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html'
})
export class HistoricoPage {
  imageUrl: string = 'assets/imgs/background.png'
  public url: string;
  public pedido: Pedido[];
  public aviso;
  constructor(
    
    public navCtrl: NavController,
    private _http: Http,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
    ){
      console.log(sessionStorage.getItem('id'));
      this.url = 'http://vservices.com.br/servicos/servicos/get_historico/'+sessionStorage.getItem("id");
    }
  
    ngOnInit(){
      
      let loader = this._loadingCtrl.create({
        content: "Carregando histórico..."
      });
      loader.present();

      this._http
      .get(this.url)
      .map(res => res.json())
      .toPromise()
      .then(pedidos =>{
        this.pedido = pedidos;
        console.log(this.pedido);
        if(this.pedido.length == 0){
          this.aviso = "Você não possui histórico";
          
        }
        console.log(this.aviso);
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

    submit(pedido){
      this.navCtrl.push(PedidoDescritoPage, {abriuPedido: pedido});
    }
  
}
