import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
}) 
export class CategoriasComponent {
 categorias:any[]=[]
 categoria: string=""  
  constructor(private httpClient:HttpClient) {

  }
  ngOnInit(): void {
    this.mostraDados();
  
  }
  mostraDados(){
    this.httpClient.get("http://localhost:3000/categorias").subscribe({
      next: (snapshot: any) => {
        console.log(snapshot);
        this.categorias = snapshot;
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
  }

  adicionaCategoria() {
    const model = {name:this.categoria}
    
    this.httpClient.post("http://localhost:3000/categorias", model).subscribe({
      next: () => {
        this.categoria = "";
        this.mostraDados();
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
  }
  removerCategoria(categoria: any) {
    console.log(categoria)
    this.httpClient.delete("http://localhost:3000/categorias/" + categoria.id).subscribe({
      next: () => {
        this.mostraDados();
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })

  }
  editarCategoria(categoria: any) {
    
    categoria.name = window.prompt("Digite a nova categoria")
    this.httpClient.put("http://localhost:3000/categorias/" + categoria.id,categoria).subscribe({
      next: () => {
        this.mostraDados();
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
  }
}
