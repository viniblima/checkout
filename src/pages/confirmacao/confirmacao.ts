import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Area } from '../../domain/area/area';
import { Pedido } from '../../domain/pedido/pedido';
import { Servico } from '../../domain/servico/servico';
import { ServicosPage } from '../servicos/servicos';

@Component({
  selector: 'page-confirmacao',
  templateUrl: 'confirmacao.html',
})
export class ConfirmacaoPage {
  imageUrl: string = 'assets/imgs/background.png'
  public data;
  public area: Area;
  public pedido: Pedido;
  public http;
  public servico: Servico;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _alertCtrl: AlertController,
    http: Http
  ){
    this.data = {};
    this.data.response = '';
    this.http = http;

    this.servico = new Servico(null,null,null);
    this.pedido = new Pedido(null,null,null, null,null,null, null, null, null, null, null, null, null);
    
    this.pedido.area = this.navParams.get('areaSelecionada');
    console.log(this.pedido.area.nome);
    console.log(this.pedido.area.id);
    
    this.servico.nome = sessionStorage.getItem("NomeServico");
    
    
    //this.pedido.servico.id = sessionStorage.getItem("IdServico");

  }
  submit(){
    
    var link = 'http://vservices.com.br/servicos/servicos/cadastrar_pedido';
    var data = JSON.stringify({
      area: this.servico.nome,
      especificacao: this.pedido.area.nome,
      titulo: this.pedido.titulo,
      descricao: this.pedido.descricao,
      cidade: this.pedido.cidade,
      estado: this.pedido.estado,
      endereco: this.pedido.endereco,
      numero: this.pedido.numero,
      telefone: this.pedido.telefone,
      status: "Aberto",
      area_id: sessionStorage.getItem("IdServico"),
      id_usuario: sessionStorage.getItem("id")
    });
    this.http.post(link, data)
    .subscribe(data => {
      this.data.response = data._body;

      if(this.data.response == " sucesso"){
        console.log("Cadastrou pedido!");
        this.cadastroAlert();
        this.navCtrl.setRoot(ServicosPage);
      }
    }, error=>{
      console.log("Ocorreu um erro!");
    });
    
  }

  cadastroAlert(){
    let alert = this._alertCtrl.create({
              title: 'Pedido efetuado!',
              buttons: [{text: "OK"}],
              subTitle: 'Cadastro do pedido efetuado com sucesso!'
            });
            alert.present();
    }

}
