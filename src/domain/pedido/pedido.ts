import { Area } from '../../domain/area/area';
import { Servico } from '../../domain/servico/servico';

export class Pedido{
    constructor(
        public id: string,
        public pedido: string,
        public area: Area,
        public servico: Servico,
        public titulo: string,
        public descricao: string,
        public status: string,
        public valor: any,
        public cidade: string,
        public estado: string,
        public endereco: string,
        public numero: any,
        public telefone: any
    ){}
}