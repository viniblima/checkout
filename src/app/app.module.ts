import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ServicosPage } from '../pages/servicos/servicos';
import { HistoricoPage } from '../pages/historico/historico';
import { SobrePage } from '../pages/sobre/sobre';
import { AjudaPage } from '../pages/ajuda/ajuda';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { DescricaoPage } from '../pages/descricao/descricao';
import { ConfirmacaoPage } from '../pages/confirmacao/confirmacao';
import { PedidoDescritoPage } from '../pages/pedido-descrito/pedido-descrito';
import { LancarValorPage } from '../pages/lancar-valor/lancar-valor';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpModule } from '@angular/http';
import { ValorPage } from '../pages/valor/valor';
import { PagarPage } from '../pages/pagar/pagar';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PagseguroProvider } from '../providers/pagseguro/pagseguro';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    ServicosPage,
    HistoricoPage,
    SobrePage,
    AjudaPage,
    LoginPage,
    SignupPage,
    DescricaoPage,
    ConfirmacaoPage,
    PedidoDescritoPage,
    LancarValorPage,
    ValorPage,
    PagarPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ServicosPage,
    HistoricoPage,
    SobrePage,
    AjudaPage,
    LoginPage,
    SignupPage,
    DescricaoPage,
    ConfirmacaoPage,
    PedidoDescritoPage,
    LancarValorPage,
    ValorPage,
    PagarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PagseguroProvider
  ]
})
export class AppModule {}