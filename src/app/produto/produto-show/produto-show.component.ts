import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/produto/produto.component';
import { ProdutoService } from 'src/app/produto/produto-service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common/';

@Component({
  selector: 'app-produto-show',
  templateUrl: './produto-show.component.html',
  styleUrls: ['./produto-show.component.scss'],
  providers: [ProdutoService, DatePipe]
})
export class ProdutoShowComponent implements OnInit {
  produto: Produto;
  isUserAdmin: boolean = false;
  isUserLogged: boolean = false;
  nome: string;
  id: any;
  resolucao: string;
  data: Date;

  constructor(private service: ProdutoService, private route: ActivatedRoute,private datepipe: DatePipe ) { }

  ngOnInit() {
    this.isAdmin();
    this.isLogged();
    this.route.paramMap.subscribe(params => {
      if (params.get("id")) {
        this.id = params.get("id");
        this.service.getProductsbyId(this.id).subscribe(resposta => {
          this.produto = resposta.json();
          this.resolucao = this.produto.resoluçãoMaxima;
          this.data = new Date(this.datepipe.transform(this.produto.dataLançamento,'dd/MM/yyyy'));
        });
      }
    });
  }

  isAdmin() {
    if (localStorage.usuario_tipo == 'admin') {
      this.isUserAdmin = true;
    }
    else {
      this.isUserAdmin = false;
    }
  }
  isLogged() {
    if (localStorage.usuario_nome !== '') {
      this.isUserLogged = true;
      this.nome = localStorage.usuario_nome;
    }
    else {
      this.isUserLogged = false;
    }
  }
  Deslogar() {
    localStorage.usuario_nome = '';
    localStorage.usuario_tipo = '';
    this.isLogged();
  }

}
