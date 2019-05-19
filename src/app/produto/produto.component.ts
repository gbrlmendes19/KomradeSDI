import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router/src/config';
import { ProdutoService } from 'src/app/produto/produto-service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common/src/pipes/date_pipe';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
  providers:[ProdutoService]
})
export class ProdutoComponent implements OnInit {
  produtos: Produto[] = [];
  subsProdutos: Subscription;  
  constructor(private service: ProdutoService) { }
  isUserAdmin: boolean = false;
  isUserLogged: boolean = false;
  nome: string;

  ngOnInit() {
    this.isAdmin();
    this.isLogged();
    this.subsProdutos = this.service.getProducts().subscribe(
      resposta => {
      this.produtos = resposta.json()
      this.service.produtos = this.produtos.slice();
      }
    )
  }
  deletar(id){
    this.service.deleteProduct(id);
  }
  isAdmin(){
    if(localStorage.usuario_tipo == 'admin'){
      this.isUserAdmin = true;
    }
    else{
      this.isUserAdmin = false;
    }
  }
  isLogged(){
    if(localStorage.usuario_nome !== ''){
      this.isUserLogged = true;
      this.nome = localStorage.usuario_nome;
    }
    else{
      this.isUserLogged = false;
    }
  }
  Deslogar(){
    localStorage.usuario_nome = '';
    localStorage.usuario_tipo = '';
    this.isLogged();
  }

  adicionarAoCarrinho(produto){
    let carrinho = JSON.parse(localStorage.carrinho);
    carrinho.produtos.push(produto);
    carrinho.total += produto.valor;
    localStorage.carrinho = JSON.stringify(carrinho);
    alert("O produto " + produto.nome + " foi adicionado com sucesso");
  }
}

export class Produto{
  id: number
  nome: string
  descricao: string
  valor: number
  plataforma:string
  genero:string
  estudio:string
  idadeRecomendada:string
  dataLançamento: Date
  resoluçãoMaxima: string
  tipo:string

  constructor(id, nome, descricao, valor, plataforma, genero, estudio, idade_recomendada, data_lancamento, resolucao_maxima, tipo){
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.valor = valor;
    this.plataforma = plataforma;
    this.genero = genero;
    this.estudio = estudio;
    this.idadeRecomendada = idade_recomendada;
    this.dataLançamento = data_lancamento;
    this.resoluçãoMaxima = resolucao_maxima;
    this.tipo = tipo;
  }

}