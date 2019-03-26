import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Pedido } from '../../domain/pedido/pedido';
import { LancarValorPage } from '../lancar-valor/lancar-valor';
import { ServicosPage } from '../servicos/servicos';

@Component({
  selector: 'page-pedido-descrito',
  templateUrl: 'pedido-descrito.html',
})
export class PedidoDescritoPage {
  imageUrl: string = 'assets/imgs/background.png';
  public page: string;
  public pedido: Pedido;
  public botao: string;
  public valor: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) 
    {
      this.pedido = this.navParams.get("abriuPedido");
    }
    ngOnInit(){
      
      if(this.pedido.status == "Em fase de pagamento"){
             this.link1(this.pedido);
      }
      
    }
    link1(pedido){
      this.navCtrl.push(LancarValorPage,{lancarValor: pedido})
    }
    
}
