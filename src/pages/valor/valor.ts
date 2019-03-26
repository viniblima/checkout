import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Pedido } from '../../domain/pedido/pedido';
import { HistoricoPage } from '../historico/historico';
@Component({
  selector: 'page-valor',
  templateUrl: 'valor.html',
})
export class ValorPage {
  imageUrl: string = 'assets/imgs/background.png';
  public pedido: Pedido;
  public data;
  public http;
  constructor(
    
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    http: Http) 
    {
      this.data = {};
      this.data.response = '';
      this.http = http;
      this.pedido = this.navParams.get("valorPedido");
      console.log(this.pedido.id);
    }
    submit(){
      var link = 'http://vservices.com.br/servicos/servicos/cadastrar_valor';
      var data = JSON.stringify({
        valor: this.pedido.valor,
        id_pedido: this.pedido.id
      });

      this.http.post(link,data)
      .subscribe(data =>{
        this.data.response = data._body;
        

        if(this.data.response == " sucesso"){
          console.log("cadastrou valor");
          this.navCtrl.setRoot(HistoricoPage);
          this.valorAlert();
        }
      })
    }
    valorAlert(){
      let alert = this._alertCtrl.create({
        title: "Valor atribuído!",
        subTitle: "Entramos na fase de pagamento do pedido!",
        buttons: [{text: "OK"}]
      });
      alert.present();
    }
    
 
}
