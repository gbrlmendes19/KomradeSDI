import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
    
  constructor() { }

  ngOnInit() {
    
  }

}

export class Usuario{
  id: number
  senha: string
  email: string;
  tipo: string;
  endereco: Endereco;

  constructor(id, senha, email, tipo, cep, rua, complemento, cidade, estado){
    this.id = id;
    this.senha = senha;
    this.email = email;
    this.tipo = tipo;
  }

  static currentUsuario(tipo){
    if(tipo === null){
      localStorage.usuario_nome; 
    }else{
      localStorage.usuario_tipo === tipo; 
    }
  }
}

export class Endereco{
  id:number;
  usuarioId: number;
  cep : string;
  estado : string;
  cidade : string;
  bairro : string;
  logradouro : string;
  complemento : string;
  numero : string;
  responsavel : string;
}