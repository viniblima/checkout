import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HistoricoPage } from '../../pages/historico/historico';
import { NavController, NavParams } from 'ionic-angular';

declare var PagSeguroDirectPayment: any;

@Injectable()
export class PagseguroProvider {
  data: any;
  public http;
  public teste;
  public id;
  public band;
  public senderHash;
  public token;
  public numCartao;
  public parcelas;
  public test;
  public sinal;
  constructor(http: Http) {
    this.teste = 'teste'
    this.parcelas = {};
    this.data = {};
    this.data.response = '';
    this.http = http;
    this.sinal = false;
    
  }
  getSession(numCartao, numSegCartao, expirationMonth, expirationYear, valorTotal, valorParcela, parcelaQuantidade,ref,holderName,holderCPF,birthDate,phone,areaCode){
    
    var link = 'http://vservices.com.br/servicos/servicos/pagamento_cartao';
    var data = {};
    this.http.post(link, data).subscribe(data =>{
      this.data.response = data._body;
      
      var res = this.data.response.split(" ");
      this.id = res[1];
      
      this.carregaPagSeguroDirectPayment().then(()=>{
        PagSeguroDirectPayment.setSessionId(this.id);
        console.log(PagSeguroDirectPayment);
        
        PagSeguroDirectPayment.getBrand({
          cardBin: numCartao,
          success: response =>{
            
            
            this.band = response.brand.name;
            this.senderHash = PagSeguroDirectPayment.getSenderHash();
            console.log(this.band);
            this.criaCardToken(numCartao, numSegCartao, expirationMonth, expirationYear, valorTotal,valorParcela, parcelaQuantidade,ref,holderName,holderCPF,birthDate,phone,areaCode);
            
          },
          error: response =>{
            console.log('Bandeira nao encontrada');
          } 
        });
      });
    });
  }
  carregaPagSeguroDirectPayment(){
    return new Promise((resolve) => {
      let script: HTMLScriptElement = document.createElement('script');
      script.addEventListener('load', r => resolve());
      script.src = 'https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js';
      document.head.appendChild(script);
      
    });
  }
  
  criaCardToken(numCartao, numSegCartao, expirationMonth, expirationYear, valorTotal,valorParcela, parcelaQuantidade,ref,holderName,holderCPF,birthDate,phone,areaCode){
    console.log(expirationYear);
    PagSeguroDirectPayment.createCardToken({
      cardNumber: numCartao,
      brand: this.band,
      cvv: numSegCartao,
      expirationMonth: expirationMonth,
      expirationYear: expirationYear,
      success:  response =>{
        console.log(response);
        this.token = response.card.token;
        console.log(this.token);
        this.buscaParcelas(valorTotal,valorParcela, parcelaQuantidade,ref,holderName,holderCPF,birthDate,phone,areaCode);
      },
      error: response => {
        this.sinal = "Nao foi possivel criar o token";
        console.log('Nao foi possivel criar o token');
      }
    });
  }

  buscaParcelas(valorTotal,valorParcela, parcelaQuantidade,ref,holderName,holderCPF,birthDate,phone,areaCode){

    PagSeguroDirectPayment.getInstallments({
      amount: valorTotal,
      brand: this.band,
      maxInstallmentNoInterest: 2,
      success: response =>{
        console.log(response);
        console.log("Liberado para enviar pagamento!");
        this.parcelas = response.installments.elo;
        
        if(this.parcelas == undefined){
          this.parcelas = response.installments.visa;
          console.log(this.parcelas);
        }
        if(this.parcelas == undefined){
          this.parcelas = response.installments.mastercard;
          console.log(this.parcelas);
        }
        if(this.parcelas == undefined){
          this.parcelas = response.installments.hipercard;
          console.log(this.parcelas);
        }
        if(this.parcelas == undefined){
          this.parcelas = response.installments.amex;
          console.log(this.parcelas);
          this.submit(valorTotal, valorParcela, parcelaQuantidade,ref,holderName,holderCPF,birthDate,phone,areaCode);
          
          
        }
      },
      error: response =>{
        console.log(response);
      }
    })
  }
  submit(valorTotal, valorParcela, parcelaQuantidade,ref,holderName,holderCPF,birthDate,phone,areaCode){
    console.log(valorParcela, parcelaQuantidade);
    var link = 'http://vservices.com.br/servicos/servicos/submit_pagamento';

    var data = JSON.stringify({
      email: 'viniblima2016@gmail.com',
      token: 'E9A323B32BBC402288FB9F20D84B8A2F',
      paymentMode: 'default',
      paymentMethod: 'creditCard',
      receiverEmail: 'viniblima2016@gmail.com',
      currency: 'BRL',
      extraAmount: '0.00',
      itemId1: '0001',
      itemDescription1: 'Serviço',
      itemAmount1: valorTotal,
      itemQuantity1: '1',
      notificationURL: 'http://vservices.com.br/notification.php',
      reference: ref,
      senderName: 'Pedro Branco',
      senderCPF: holderCPF,
      senderAreaCode: areaCode,
      senderPhone: phone,
      senderEmail: 'pedro.v.b@hotmail.com',
      senderHash: this.senderHash,
      shippingAddressStreet: 'Rua Bras Cubas',//20
      shippingAddressNumber: '49',
      shippingAddressComplement: 'nd',
      shippingAddressDistrict: 'Jd Sto Antonio',
      shippingAddressPostalCode: '06152050',
      shippingAddressCity: 'Osasco',
      shippingAddressState: 'SP',
      shippingAddressCountry: 'BRA',
      shippingType: '1',
      shippingCost: '0.00',
      creditCardToken: this.token,
      installmentQuantity: parcelaQuantidade,
      installmentValue: valorParcela,
      noInterestInstallmentQuantity: '2',
      creditCardHolderName: holderName,
      creditCardHolderCPF: holderCPF,
      creditCardHolderBirthDate: birthDate,
      creditCardHolderAreaCode: areaCode,
      creditCardHolderPhone: phone,
      billingAddressStreet: 'Avenida Brigadeiro Faria Lima',
      billingAddressNumber:'1384',//20
      billingAddressComplement: '5o andar',
      billingAddressDistrict: 'Jardim Paulistano',
      billingAddressPostalCode: '01452002',
      billingAddressCity: 'Sao Paulo',
      billingAddressState: 'SP',
      billingAddressCountry: 'BRA'
    });

    this.http.post(link, data).subscribe(data=> {
      this.data.response = data._body;
      console.log(this.data);
      data = this.data;
      this.sinal = this.data.response;
      console.log(this.sinal);
        
      
      
    })
  }
  
  
  
  load(){
    if(this.data){
      return Promise.resolve(this.data);
    }

  return new Promise(resolve => {
    

    var link = 'https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js';
    var data = JSON.stringify({
      email: 'viniblima2016@gmail.com',
      token:'59B88128D45245749A81C41B832C69FB'
    });
    this.http.post(link, data)
    .subscribe(data => {
      this.data = data;
      resolve(this.data);
      console.log(this.data);

      
    });
  });
  }

}


