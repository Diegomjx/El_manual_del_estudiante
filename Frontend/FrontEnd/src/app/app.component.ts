import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';
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
    private router:Router,
    private ngxToastService: NgxToastService ) { }


  login(){
    this.router.navigateByUrl('/login');
    this.name = localStorage.getItem('name') || 'User';
  }

  home(){
    this.router.navigateByUrl('/');
  }

  upload(){
    if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/upload');
    else
    this.ngxToastService.onWarning('Fail','por favor iniciar sesión');
  }
  ngOnInit(): void {
    this.serviceComunicate.enviarnombreobservable.subscribe(nombre=>{
      this.name = nombre;
    })
  }



  textEditor(){
    if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/textEditor');
    else
    this.ngxToastService.onWarning('Fail','por favor iniciar sesión');
  }

  MyNotes(){
    if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/MiNotes');
    else
    this.ngxToastService.onWarning('Fail','por favor iniciar sesión');
  }

  ngOnChange(): void {
    this.name = localStorage.getItem('name') || 'User';
  }

  Logout(){
    if(localStorage.getItem("id") != null){
    localStorage.removeItem("id");
        localStorage.removeItem("type");
        localStorage.removeItem("name");
        this.name = localStorage.getItem('name') || 'User';
    }
    this.router.navigateByUrl('/');
  }
  search(){
    this.router.navigateByUrl('/search');
  }

  



  
}




