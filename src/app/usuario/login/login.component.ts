import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';
import { Usuario } from '../usuario.component';
import { UsuarioService } from 'src/app/usuario/usuario-service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { Carrinho } from 'src/app/carrinho/carrinho.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[UsuarioService]
})
export class LoginComponent implements OnInit {
  
  usuarioForm: FormGroup;
  usuario;
  subsLogin: Subscription;

  constructor(private fb: FormBuilder, private service:UsuarioService, private router :Router) { }

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      email: [''],
      senha: [''],
      tipo: ['normal']
    });
  }

  onSubmit(){
    let email = this.usuarioForm.value.email;
    let senha = Md5.hashStr(this.usuarioForm.value.senha); 
    
    this.subsLogin = this.service.Login(email,senha).subscribe(
      resposta => {
        let carrinho = new Carrinho();
         this.usuario = resposta.json();
         localStorage.usuario_id = this.usuario.id;         
         localStorage.usuario_nome = this.usuario.email;
         localStorage.usuario_tipo = this.usuario.tipo;
         localStorage.carrinho = JSON.stringify(carrinho);
         alert('Logado com sucesso!.')
         this.router.navigateByUrl('/produtos');
         
        },
        error => {
          alert('Senha ou email incorreto.')  
        }
    )
  
  }

}
