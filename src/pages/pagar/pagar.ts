import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Pedido } from '../../domain/pedido/pedido';
import { Dados } from '../../domain/dados/dados';
import { PagseguroProvider } from '../../providers/pagseguro/pagseguro';
import { ServicosPage } from '../servicos/servicos';
import { Http } from '@angular/http';

@Component({
  selector: 'page-pagar',
  templateUrl: 'pagar.html',
})
export class PagarPage {
  imageUrl: string = 'assets/imgs/background.png';
  public pedido: Pedido;
  public dados: Dados;
  public valorParcela;
  public ref;
  public teste2;
  public dismiss1;
  public sinal;
  public http;
  public data;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pagSeguro: PagseguroProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    http: Http) 
    {
      this.pedido = this.navParams.get("pedido");
      console.log(this.pedido);
      this.dados = new Dados(null, null, null, null, null, null,null,null,null, null);
      this.http = http;
      this.data = {};
      this.data.response = '';
      this.valorParcela = this.pedido.valor/2;
      this.valorParcela += "0";
      parseFloat(this.valorParcela);
      console.log(this.valorParcela);
      
    }

    teste(){
      let loader = this.loadingCtrl.create({
        content: "Efetuando pagamento..."
      });
      loader.present();
      
      console.log(this.dados);
      
      console.log(this.valorParcela);
      console.log(this.pedido.valor);
      this.ref = "sucesso#"+this.pedido.id;
      
      this.pagSeguro.getSession(this.dados.numCartao, this.dados.numSegCartao, this.dados.expirationMonth, this.dados.expirationYear, this.pedido.valor, this.valorParcela, this.dados.parcelaQuantidade, this.ref, this.dados.holderName, this.dados.holderCPF,this.dados.holderBirthDate, this.dados.holderPhone, this.dados.holderAreaCode);
      
      let TIME_IN_MS = 20000;
      let hideFooterTimeout = setTimeout(() =>{
        this.sinal = this.pagSeguro.sinal;
        console.log(this.sinal);
        console.log(this.ref);
        loader.dismiss();

        if(this.sinal == " "+this.ref){
          this.navCtrl. setRoot(ServicosPage);
          this.sucessoAlert();
          this.statusPago();
        }
        if(this.sinal == 'Nao foi possivel criar o token'){
            this.dadosIncorretosAlert();
        }
        if(this.sinal == false){
            this.expiradoAlert();
        }
        

      }, TIME_IN_MS);
      
    }
  
    sucessoAlert(){
      let alert = this.alertCtrl.create({
        title: "Pagamento efetuado!",
        subTitle: "Seu pagamento foi aprovado",
        buttons: [{text: "OK"}]
      });
      alert.present();
    }
    expiradoAlert(){
      let alert = this.alertCtrl.create({
        title: "Sessão expirou!",
        subTitle: "Verifique se os dados estão corretos e a velocidade da sua conexão!",
        buttons: [{text: "OK"}]
      });
      alert.present();
    }
    dadosIncorretosAlert(){
      let alert = this.alertCtrl.create({
        title: "Não foi possível criar o token do cartão!",
        subTitle: "Verifique se os dados estão corretos e a velocidade da sua conexão!",
        buttons: [{text: "OK"}]
      });
      alert.present();
    }

    statusPago(){
      var link = 'http://vservices.com.br/servicos/servicos/pedido_pago';
      var data = JSON.stringify({
        id: this.pedido.id
      });
      this.http.post(link, data)
      .subscribe(data =>{
        this.data.response = data._body;
        console.log(this.data.response);

      })
    }
    
}
