import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';
import { LoginComponent } from './components/login/login.component';
import { IDItem, ListItem } from './models/models';
import { BackendService } from './services/backend.service';
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
  Lista: ListItem[];

  constructor(
    private BackendService:BackendService,
    private serviceComunicate: ComunicacionService,
    private router:Router,
    private ngxToastService: NgxToastService ) {
      this.Lista = [];
     }


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

  CreateList(){
    if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/addList');
    else
    this.ngxToastService.onWarning('Fail','por favor iniciar sesión');

  }

  dellList(){
    if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/dellList');
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

  refresh(){
    const id = localStorage.getItem("id") || "-1";
    this.BackendService.getLists( 
      new IDItem(parseInt(id))
    ).subscribe((x:any)=>{
      if(x.msg == "ok"){
        this.Lista = x.result;
      }
    });

  }

  ListSelected(List:ListItem){
    this.serviceComunicate.showList(List);
    this.router.navigateByUrl('/LookList');

  }

  



  
}




