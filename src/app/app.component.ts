import { Component } from '@angular/core';
import { Usuario } from './usuario/usuario.component';
import { Carrinho } from 'src/app/carrinho/carrinho.component';
import { Jsonp } from '@angular/http/src/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Komrade';
  
  ngOnInit(){
    let carrinho = new Carrinho();
    if(!localStorage.carrinho)
      localStorage.carrinho = JSON.stringify(carrinho);
  }

}
