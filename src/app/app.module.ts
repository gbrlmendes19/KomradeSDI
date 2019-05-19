import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutoShowComponent } from './produto/produto-show/produto-show.component';
import { ProdutoFormComponent } from './produto/produto-form/produto-form.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { LoginComponent } from './usuario/login/login.component';


import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { HttpModule } from '@angular/http/';
import { MinhaContaComponent } from 'src/app/usuario/minha-conta-form/minha-conta-form.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';

const appRoutes: Routes = [
  { 
    path: '',
    redirectTo: "/produtos",
    pathMatch: 'full'
  },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'produtos', component: ProdutoComponent },
  { path: 'produto/:id', component: ProdutoShowComponent },
  { path: 'produtos/new', component: ProdutoFormComponent },
  { path: 'produtos/edit/:id', component: ProdutoFormComponent },

  { path: 'usuarios', component: UsuarioComponent },
  { path: 'usuarios/new', component: UsuarioFormComponent },
  { path: 'usuarios/edit/:id', component: UsuarioFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'minhaconta', component: MinhaContaComponent }
  
  
];

@NgModule({
  declarations: [
    AppComponent,
    ProdutoComponent,
    ProdutoShowComponent,
    ProdutoFormComponent,
    UsuarioComponent,
    UsuarioFormComponent,
    LoginComponent,
    MinhaContaComponent,
    CarrinhoComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
