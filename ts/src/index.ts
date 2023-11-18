// Crie as entidades(classes) necessárias para um sistema que faça o controle de funcionários de uma empresa. 
// Essa empresa conta com dois tipos de contrato, CLT e estágio, e deve representar os atributos de seus funcionários
// de acordo com seu tipo de contrato, como carga horária, cargo, formação, dados pessoais.

// Esse sistema, deve ser capaz de gerar o contra cheque de cada funcionário, deve também adicionar, remover e listar
// os funcionários

// Crie as entidades necessárias para um sistema que faça o controle de funcionários de uma empresa:

//     * Um funcionário deve ter dados pessoais(nome, idade, etc.)
//     * Um funcionário devem ter uma carga horária
//     * Um CLT devem ter uma formação
//     * Um CLT devem ter um cargo
//     * Um CLT deve ter um atributo salário
//     * Um estagiário deve ter um atributo "bolsa"(salário)
//     * Um estagiário deve ter um atributo formação
//     * Um estagiário deve ter um uma área de atuação
//     * Um estagiário deve ter um atributo status da formação ("cursando")
//     * A classe funcionário deve conter um método "gerarRemuneracao"
//     * Funcionários CLT tem desconto no pagamento, e deve ser calculado na hora de gerar a remuneração

//     * É preciso ter uma listagem de funcionários, para isso utilize uma classe Funcionários 
//         * A classe Funcionarios deve métodos para adicionar e remover um funcionário

abstract class Funcionarios {
    private _nome: string;
    private _idade: number;
    private _cpf: string;
    private _formacao: string;
    protected _statusDaFormacao: string;
    private _cargaHoraria: number;
    
    constructor(_nome:string,_idade:number, _cpf:string, _formacao:string, _cargaHoraria: number){
        this._nome = _nome;
        this._idade = _idade;
        this._cpf = _cpf;
        this._formacao = _formacao;
        this._statusDaFormacao = "Concluído"
        this._cargaHoraria = _cargaHoraria;
    }

    get nome(){
        return this._nome;
    } 
    get idade(){
        return this._idade;
    } 
    get cpf(){
        return this._cpf;
    } 
    get formacao(){
        return this._formacao;
    } 
    get cargaHoraria(){
        return this._cargaHoraria
    }

    abstract gerarRemuneracao(): string;
}

class CLT extends Funcionarios{
    private _cargo: string
    private _salario: number
    constructor(_nome:string,_idade:number, _cpf:string,_formacao: string, _cargaHoraria: number,  _cargo:string, _salario:number){
        super(_nome,_idade, _cpf,_formacao, _cargaHoraria)
        this._cargo = _cargo;
        this._salario = _salario
    }

    get cargo(){
        return this._cargo
    }

    get salario(){
        return this._salario
    }

    gerarRemuneracao(): string{
        const desconto = this._salario * 0.1
        const salarioFinal = this._salario - desconto
        return `\nSeu salário é: R$${salarioFinal}` 
    }
}

class Estagiario extends Funcionarios{
    private _bolsa: number;
    private _areaDeAtuacao: string;

    constructor(_nome:string,_idade:number, _cpf:string, _formacao: string, _cargaHoraria: number,  _areaDeAtuacao: string, _bolsa:number, ){
        super(_nome,_idade, _cpf, _formacao, _cargaHoraria)
        this._areaDeAtuacao = _areaDeAtuacao;
        this._bolsa = _bolsa;
        this._statusDaFormacao = "Cursando"
    }

    get bolsa(){
        return this._bolsa;
    }

    get areaDeAtuacao(){
        return this._areaDeAtuacao
    }

    gerarRemuneracao(): string{
        return `\nSua bolsa é: R$${this.bolsa}` 
    }
    
}

const clt1 = new CLT ('Edson', 24, "149.824.057-78", "Ciência da Computação", 40, "Dev Back-End Junior", 3000)

const estagiario1 = new Estagiario ('João', 22, "000.000.000-00", "Análise e Desenvolvimento de Sistemas", 20, "Back-End", 1200)
console.log(clt1)
console.log(clt1.gerarRemuneracao())

console.log(estagiario1)
console.log(estagiario1.gerarRemuneracao())