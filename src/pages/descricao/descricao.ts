import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Servico} from '../../domain/servico/servico';
import { Area } from '../../domain/area/area';
import { ConfirmacaoPage } from '../confirmacao/confirmacao';

@Component({
  selector: 'page-descricao',
  templateUrl: 'descricao.html',
})

export class DescricaoPage {
  imageUrl: string = 'assets/imgs/background.png'
  public servico: Servico;
  public url: string;
  public area: Area[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _http: Http,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController  
  ){
    
    this.servico = this.navParams.get('servicoSelecionado');
    console.log(this.servico.id);
    console.log(this.servico.nome);
    this.url = 'http://vservices.com.br/servicos/servicos/get_area/' + this.servico.id;
    sessionStorage.setItem("NomeServico",this.servico.nome);
    sessionStorage.setItem("IdServico",this.servico.id);
    
    
  }
  ngOnInit(){
    let loader = this._loadingCtrl.create({
      content: "Carregando área..."
    });
    loader.present();

    this._http
      .get(this.url)
      .map(res => res.json())
      .toPromise()
      .then(areas =>{
        this.area = areas;
        loader.dismiss();
      })
      .catch(err =>{
        console.log(err);
        this._alertCtrl
        .create({
          title: "Falha na conexão",
          buttons: [{ text: "OK"}],
          subTitle: "Não foi possivel obter a descrição. Tente novamente."
        }).present();
      });
  }
  submit(area){
    
    this.navCtrl.push(ConfirmacaoPage,{areaSelecionada: area});
    
  }
 
}
