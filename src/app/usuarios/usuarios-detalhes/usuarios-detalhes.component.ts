import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-detalhes',
  templateUrl: './usuarios-detalhes.component.html',
  styleUrls: ['./usuarios-detalhes.component.scss']
})
export class UsuariosDetalhesComponent {

  name: string = ""
  email: any;
  password: any;
  titulo: any;
  idUsuario: any;


  constructor(private activatedRoute: ActivatedRoute,
    private route: Router,
    private httpClient: HttpClient) {

  }
  ngOnInit(): void {
    this.idUsuario = this.activatedRoute.snapshot.paramMap.get("id")
    this.titulo = this.idUsuario != "0" ? "Editar Usuario" : "Novo Usuario"

    if (this.idUsuario != "0") {
      this.buscaUsuario(this.idUsuario)
    }
  }
  buscaUsuario(idUsuario: any) {

    this.httpClient.get("http://localhost:3000/usuarios/" + idUsuario).subscribe({
      next: (snapshot: any) => {
        console.log(snapshot)
        this.name = snapshot.name;
        this.email = snapshot.email;

        return snapshot
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
  }
  criaUsuario() {
    const model = {
      id: this.idUsuario,
      name: this.name,
      email: this.email,
      password: this.password
    }

    if (!model.name || !model.email || !model.password) {
      alert("Por favor preencha todos campos")
      return
    }
    if (!model.email.includes("@")) {
      alert("email invalido!")
      return
    }

    if (this.idUsuario != "0") {

      this.httpClient.put("http://localhost:3000/usuarios/" + model.id, model).subscribe({
        next: () => {
          alert("Usuario atualizado com sucesso")
          this.route.navigateByUrl("/usuarios")
        },
        error: (error) => {
          alert("Deu ruim")
        }
      })
    } else {
      delete model.id;
      this.httpClient.post("http://localhost:3000/usuarios", model).subscribe({
        next: () => {

          alert("Usuario cadastrado com sucesso")
          this.route.navigateByUrl("/produtos")
        },
        error: (error) => {
          alert("Deu ruim")
        }
      })
    }



  }
}
