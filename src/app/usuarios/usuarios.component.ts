import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
   usuarios: any[]=[];
  
  constructor(private httpClient: HttpClient) {

  }
  ngOnInit(): void {
    this.listaUsuarios()

  }
  listaUsuarios(){
    this.httpClient.get("http://localhost:3000/usuarios").subscribe({
      next: (snapshot: any) => {
        console.log(snapshot);
        this.usuarios = snapshot;
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
  }
  excluiUsuario(usuario: any) {
    console.log(usuario)
    this.httpClient.delete("http://localhost:3000/usuarios/" + usuario.id).subscribe({
      next: () => {
        this.listaUsuarios();
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })

  }
}
