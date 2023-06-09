import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent {

  produtos: any[] = []


  constructor(private httpClient: HttpClient,
    private userService: UserService) {

  }
  ngOnInit(): void {
    console.log(this.userService.currentUser)
    this.mostraDados();


  }

  mostraDados() {
    this.httpClient.get("http://localhost:3000/produtos").subscribe({
      next: (snapshot: any) => {
        console.log(snapshot);
        this.produtos = snapshot;
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })

  }

  removerproduto(produto: any) {
    console.log(produto)
    this.httpClient.delete("http://localhost:3000/produtos/" + produto.id).subscribe({
      next: () => {
        this.mostraDados();
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })

  }

}
