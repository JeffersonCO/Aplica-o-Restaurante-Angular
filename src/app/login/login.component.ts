import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  login:string=""
  password:any;

  constructor(private httpClient: HttpClient,
    private route: Router, 
    private userService: UserService) {

  }
  ngOnInit(): void {
    

  }
  logar() {

    this.httpClient.get("http://localhost:3000/usuarios?email="+this.login+"&password="+this.password).subscribe({
      next: (snapshot:any ) => {
        if(snapshot.length==0){
          alert("Usuario nao encontrado")
          return
        }

        this.userService.currentUser=snapshot[0]
        console.log(snapshot,this.userService.currentUser);
        this.route.navigateByUrl("/produtos")
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
  }


}