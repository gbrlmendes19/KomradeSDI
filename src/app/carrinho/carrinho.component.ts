import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/produto/produto.component';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {
  carrinho: Carrinho;
  isUserAdmin: boolean = false;
  isUserLogged: boolean = false;
  nome: string;

  constructor() { }

  ngOnInit() {
    this.isAdmin();
    this.isLogged();
    this.carrinho = JSON.parse(localStorage.carrinho);
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

  removerDoCarrinho(produto){
    let carrinho = JSON.parse(localStorage.carrinho);
    carrinho.produtos = carrinho.produtos.filter(item => item.id !== produto.id);
    carrinho.total -= produto.valor;
    localStorage.carrinho = JSON.stringify(carrinho);
    alert("O produto " + produto.nome + " foi removido com sucesso");
    this.carrinho = JSON.parse(localStorage.carrinho);
    
  }

}

export class Carrinho{
  produtos: Produto[] = [];
  total: number = 0;
}
