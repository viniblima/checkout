import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Pedido } from '../../domain/pedido/pedido';
import { Http } from '@angular/http';
import { ValorPage } from '../valor/valor';
import { PagarPage } from '../pagar/pagar';

@Component({
  selector: 'page-lancar-valor',
  templateUrl: 'lancar-valor.html',
})
export class LancarValorPage {
  imageUrl: string = 'assets/imgs/background.png';
  public pedido: Pedido;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ){
    this.pedido = this.navParams.get("lancarValor");
    this.pedido.valor += ".00";
    
    parseFloat(this.pedido.valor);
    console.log(this.pedido.valor);

  }

  submit(pedido){
    this.navCtrl.push(PagarPage, {pedido: pedido})
  }

 
}
