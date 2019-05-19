import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario, Endereco } from 'src/app/usuario/usuario.component';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/usuario/usuario-service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-conta-form',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta-form.component.scss'],
  providers:[UsuarioService]
})
export class MinhaContaComponent implements OnInit {
  endereco: Endereco;
  enderecoForm: FormGroup;
  subsEnd: Subscription;
  possuiEndereco: boolean = false;;
  isUserAdmin: boolean = false;
  isUserLogged: boolean = false;
  nome: string;
  

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service:UsuarioService) { }

  ngOnInit() {
    this.isAdmin();
    this.isLogged();
    this.subsEnd = this.service.getEndereco(localStorage.usuario_id).subscribe(
      resposta => {

         this.endereco = resposta.json();
         this.possuiEndereco = true; 
        },
        error => {
          this.possuiEndereco = false; 
        }
    )
    
    this.route.paramMap.subscribe(params => {
      this.enderecoForm = this.fb.group({
        usuarioId:[localStorage.usuario_id],
        cep : [''],
        estado : [''],
        cidade : [''],
        bairro : [''],
        logradouro : [''],
        complemento : [''],
        numero : [''],
        responsavel : ['']
      });
    });
  }
  
  onSubmit(){
    this.service.addEndereco(this.enderecoForm.value);
  }

  excluir(){
    this.service.deleteEndereco(this.endereco.id)
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

}

