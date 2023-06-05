import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ImagensComponent } from './imagens/imagens.component';
import { CommonModule } from '@angular/common';
import { ProdutosDetalhesComponent } from './produtos/produtos-detalhes/produtos-detalhes.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosDetalhesComponent } from './usuarios/usuarios-detalhes/usuarios-detalhes.component';


const routes: Routes = [
  {
    path:"produtos",
    component:ProdutosComponent
  },
  {
    path:"produtos/:id",
    component:ProdutosDetalhesComponent
  },
  {
    path:"categorias",
    component:CategoriasComponent
  },
  {
    path:"imagens",
    component:ImagensComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"usuarios",
    component:UsuariosComponent
  },
  {
    path:"usuarios/:id",
    component:UsuariosDetalhesComponent
  },
  {
    path:"**",
    redirectTo:"login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
@NgModule({
  imports: [
    CommonModule
  ],
  
})
export class FirtComponentComponent { }