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

interface DadosPessoais {
    nome: string;
    idade: number;
    cpf: string;
    formacao: string;
    cargaHoraria: number;
}

interface CLTParams extends DadosPessoais {
    cargo: string;
    salario: number;
}

interface EstagiarioParams extends DadosPessoais {
    areaDeAtuacao: string;
    bolsa: number;
}

interface FuncionarioInterface {
    gerarRemuneracao(): string;
}

abstract class Funcionarios implements FuncionarioInterface {

    private static listaDeFuncionarios: Funcionarios[] = [];

    private _nome: string;
    private _idade: number;
    private _cpf: string;
    private _formacao: string;
    protected _statusDaFormacao: string;
    private _cargaHoraria: number;
    
    constructor(params: DadosPessoais){
        this._nome = params.nome;
        this._idade = params.idade;
        this._cpf = params.cpf;
        this._formacao = params.formacao;
        this._statusDaFormacao = "Concluído"
        this._cargaHoraria = params.cargaHoraria;
    }

    static adicionarFuncionario(funcionario: Funcionarios) {
        Funcionarios.listaDeFuncionarios.push(funcionario);
    }

    static removerFuncionario(funcionario: Funcionarios) {
        const index = Funcionarios.listaDeFuncionarios.indexOf(funcionario);
        if (index !== -1) {
            Funcionarios.listaDeFuncionarios.splice(index, 1);
        }
    }

    static listarFuncionarios(){
        return Funcionarios.listaDeFuncionarios;
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
    constructor(params: CLTParams){
        super(params)
        this._cargo = params.cargo;
        this._salario = params.salario
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
    
    constructor(params: EstagiarioParams){
        super(params)
        this._areaDeAtuacao = params.areaDeAtuacao;
        this._bolsa = params.bolsa;
        this._statusDaFormacao = "Cursando"
    }

    get bolsa(){
        return this._bolsa;
    }

    get areaDeAtuacao(){
        return this._areaDeAtuacao
    }

    gerarRemuneracao(): string{
        return `\nSua bolsa é: R$${this._bolsa}` 
    }
    
}

const clt1 = new CLT ({
    nome: 'Edson', 
    idade: 24, 
    cpf: "149.824.057-78", 
    formacao: "Ciência da Computação", 
    cargaHoraria: 40, 
    cargo: "Dev Back-End Junior", 
    salario: 3000})

const estagiario1 = new Estagiario ({
    nome: 'João', 
    idade: 22, 
    cpf: "000.000.000-00", 
    formacao: "Análise e Desenvolvimento de Sistemas",
    cargaHoraria: 20,
    areaDeAtuacao: "Back-End",
    bolsa: 1200})

Funcionarios.adicionarFuncionario(clt1)
console.log(Funcionarios.listarFuncionarios())
console.log(clt1.gerarRemuneracao())

Funcionarios.adicionarFuncionario(estagiario1)
console.log(Funcionarios.listarFuncionarios())
Funcionarios.removerFuncionario(estagiario1)

console.log(Funcionarios.listarFuncionarios())