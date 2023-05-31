import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-imagens',
  templateUrl: './imagens.component.html',
  styleUrls: ['./imagens.component.scss']
}) 
export class ImagensComponent {
 imagens:any[]=[]
 imagem: string=""  
  constructor(private httpClient:HttpClient) {

  }
  ngOnInit(): void {
    this.mostraDados();
  
  }
  mostraDados(){
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

  adicionaimagem() {
    const model = {Url:this.imagem}
    
    this.httpClient.post("http://localhost:3000/imagens", model).subscribe({
      next: () => {
        this.imagem = "";
        this.mostraDados();
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
  }
  removerimagem(imagem: any) {
    console.log(imagem)
    this.httpClient.delete("http://localhost:3000/imagens/" + imagem.id).subscribe({
      next: () => {
        this.mostraDados();
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })

  }
  editarimagem(imagem: any) {
    
    imagem.Url = window.prompt("Digite a nova imagem")
    this.httpClient.put("http://localhost:3000/imagens/" + imagem.id,imagem).subscribe({
      next: () => {
        this.mostraDados();
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
  }
}
