import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ComunicacionService } from './services/comunicacion.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent   {
  title = 'FrontEnd';
  panelOpenState = false;
  showAlert = false;
  name = localStorage.getItem('name') || 'User';

  constructor(
    private serviceComunicate: ComunicacionService,
    private router:Router ) { }


  login(){
    this.router.navigateByUrl('/login');
    this.name = localStorage.getItem('name') || 'User';
  }

  upload(){
    this.router.navigateByUrl('/upload')
  }
  ngOnInit(): void {
    this.serviceComunicate.enviarnombreobservable.subscribe(nombre=>{
      this.name = nombre;
    })
  }



  ngOnChange(): void {
    this.name = localStorage.getItem('name') || 'User';
  }

  Logout(){
    localStorage.removeItem("id");
        localStorage.removeItem("type");
        localStorage.removeItem("name");
        this.name = localStorage.getItem('name') || 'User';

  }

  



  
}




