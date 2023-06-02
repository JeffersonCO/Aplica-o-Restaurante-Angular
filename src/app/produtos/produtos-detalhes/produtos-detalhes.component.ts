import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produtos-detalhes',
  templateUrl: './produtos-detalhes.component.html',
  styleUrls: ['./produtos-detalhes.component.scss']
})
export class ProdutosDetalhesComponent {


  nomeProduto: string = ""
  description: string = ""
  selectedImageId: any;
  selectedCategoryId: any;
  categories: any[] = []
  imagens: any[] = []
  titulo: string = ""
  idProduto: any;
  funcao: any;


  constructor(private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient, 
    private route:Router
  ) {


  }
  ngOnInit(): void {

    this.idProduto = this.activatedRoute.snapshot.paramMap.get("id")
    this.titulo = this.idProduto != "0" ? "Editar Produto" : "Novo Produto"

    //  this.idProduto != "0" ? this.editarProduto(this.buscaProduto(this.idProduto)) :
    //  this.adicionaProduto();


    console.log(this.idProduto)

    this.buscaCategorias();
    this.buscaImagens();

    if (this.idProduto != "0") {
      this.buscaProduto(this.idProduto)
    }
  }

  buscaProduto(idProduto: any) {

    this.httpClient.get("http://localhost:3000/produtos/" + idProduto).subscribe({
      next: (snapshot: any) => {
        console.log(snapshot)
        this.nomeProduto = snapshot.name;
        this.description = snapshot.description;
        this.selectedImageId = snapshot.image.id;
        this.selectedCategoryId = snapshot.category.id;
        return snapshot
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
  }


  buscaCategorias() {
    this.httpClient.get("http://localhost:3000/categorias").subscribe({
      next: (snapshot: any) => {
        console.log(snapshot);
        this.categories = snapshot;
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
  }
  buscaImagens() {
    this.httpClient.get("http://localhost:3000/imagens").subscribe({
      next: (snapshot: any) => {
        console.log(snapshot);
        this.imagens = snapshot;
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
  }

  adicionaProduto() {

    const model = {
      id: this.idProduto,
      name: this.nomeProduto,
      description: this.description,
      image: this.imagens.find(image => image.id == this.selectedImageId),
      category: this.categories.find(category => category.id == this.selectedCategoryId)
    }


    if (!model.name || !model.description || !model.image || !model.category) {
      alert("Por favor preencha todos campos")
      return
    }

    if (this.idProduto != "0") {


      this.httpClient.put("http://localhost:3000/produtos/" + model.id, model).subscribe({
        next: () => {
          alert("Produto atualizado com sucesso")
          this.route.navigateByUrl("/produtos")
        },
        error: (error) => {
          alert("Deu ruim")
        }
      })
    }else{
      delete model.id
      this.httpClient.post("http://localhost:3000/produtos", model).subscribe({
      next: () => {

        alert("Produto cadastrado com sucesso")
        this.route.navigateByUrl("/produtos")
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
    }

    
  }

  
}
