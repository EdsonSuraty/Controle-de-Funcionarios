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
    cpf: "000.000.000-00", 
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
console.log(`Salário CLT abaixo: ${clt1.gerarRemuneracao()}`)

Funcionarios.adicionarFuncionario(estagiario1)
console.log(Funcionarios.listarFuncionarios())
console.log(`Salário Estagiário abaixo: ${estagiario1.gerarRemuneracao()}`)
Funcionarios.removerFuncionario(estagiario1)

console.log(Funcionarios.listarFuncionarios())