import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/usuario/usuario.component';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/usuario/usuario-service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
  providers:[UsuarioService]
})
export class UsuarioFormComponent implements OnInit {
  usuario: Usuario;
  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service:UsuarioService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.usuarioForm = this.fb.group({
        id: [0],
        senha: [''],
        confirmarSenha: [''],        
        email: [''],
        tipo:['normal']
      });
    });
  }
  
  onSubmit(){
    if(this.usuarioForm.get('senha').value !== this.usuarioForm.get('confirmarSenha').value){
      alert('Senhas informadas não são iguais.')
    }
    else{
      this.usuarioForm.removeControl('confirmarSenha');
      this.service.addUser(this.usuarioForm.value);
    }
  }

}

