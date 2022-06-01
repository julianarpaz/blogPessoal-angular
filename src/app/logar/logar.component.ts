import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.component.html',
  styleUrls: ['./logar.component.css']
})
export class LogarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin() 

  constructor(private auth: AuthService, private router: Router) {
    window.scroll(0,0)
   }

  ngOnInit(){

  }

  entrar(){
    this.auth.logar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin)=>{
        this.usuarioLogin = resp
        environment.nome = this.usuarioLogin.nome
        environment.id = this.usuarioLogin.id
        environment.foto = this.usuarioLogin.foto
        environment.token = this.usuarioLogin.token
        environment.tipo = this.usuarioLogin.tipo

        console.log(environment.nome)
        console.log(environment.id)
        console.log(environment.foto)
        console.log(environment.token)
        console.log(environment.tipo)

        this.router.navigate(['/inicio'])
      },
      error: erro =>{
        if(erro.status==401){
          alert('Usuario ou senha inválidos.')
        }
      }
    })
  }

}
