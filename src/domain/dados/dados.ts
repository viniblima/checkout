export class Dados{
    constructor(
        public numCartao: string,
        public numSegCartao: string,
        public expirationMonth: string,
        public expirationYear: string,
        public holderName: string,
        public holderCPF: string,
        public holderBirthDate: string,
        public holderAreaCode: string,
        public holderPhone: string,
        public parcelaQuantidade: number
    ){}
}