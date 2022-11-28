import { Component, ViewChild, AfterContentInit , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';
import { LoginComponent } from './components/login/login.component';
import { IDItem, ID_LISTAiTEM, ListItem, ListItemsend, siguiendo, USUARIOID } from './models/models';
import { BackendService } from './services/backend.service';
import { ComunicacionService } from './services/comunicacion.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'FrontEnd';
  panelOpenState = false;
  showAlert = false;
  name = localStorage.getItem('name') || 'User';
  Rol=localStorage.getItem('Rol')||"";
  Lista: ListItem[];
  siguiendo:USUARIOID[];
  ID_list:number = 0;

  constructor(
    private BackendService:BackendService,
    private serviceComunicate: ComunicacionService,
    private router:Router,
    private ngxToastService: NgxToastService ) {
      this.Lista = [];
      this.siguiendo=[];
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
      this.refresh();
    });

    this.serviceComunicate.Rolobservable.subscribe(Rol=>{
      this.Rol = Rol;
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

  Historial(){
    if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/historial');
    else
    this.ngxToastService.onWarning('Fail','por favor iniciar sesión');
  }

  Megusta(){
    if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/Megusta');
    else
    this.ngxToastService.onWarning('Fail','por favor iniciar sesión');
  }

  ngOnChange(): void {
    this.name = localStorage.getItem('name') || 'User';
  }

  Logout(){
    if(localStorage.getItem("id") != null){
    localStorage.removeItem("id");
        localStorage.removeItem("Rol");
        localStorage.removeItem("name");
        this.name = 'User';
        this.Rol = '';
    }
    this.router.navigateByUrl('/');
  }
  search(){
    this.router.navigateByUrl('/search');
  }

  Electronica(){
    if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/Electronica');
    else
    this.ngxToastService.onWarning('Fail','por favor iniciar sesión');
  }

  graphEditor(){
    if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/graphEditor');
    else
    this.ngxToastService.onWarning('Fail','por favor iniciar sesión');
  }
  mindmap(){
    if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/mindmap');
    else
    this.ngxToastService.onWarning('Fail','por favor iniciar sesión');
  }
  MapEditor(){
    if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/MapEditor');
    else
    this.ngxToastService.onWarning('Fail','por favor iniciar sesión');
  }

  statemap(){
    if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/statemap');
    else
    this.ngxToastService.onWarning('Fail','por favor iniciar sesión');
  }
  draw(){
    if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/draw');
    else
    this.ngxToastService.onWarning('Fail','por favor iniciar sesión');
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

    this.BackendService.getSeguiendo( 
      new IDItem(parseInt(id))
    ).subscribe((x:any)=>{
      if(x.msg == "ok"){
        this.siguiendo = x.result;
      }
    });

  }

  ListSelected(List:ListItem){
    this.serviceComunicate.showList(List);
    this.ID_list = List.ID_LISTA;
    this.router.navigateByUrl(`/LookList?ID_LISTA=${List.ID_LISTA}`);

  }

  Siguiendo(seguir:USUARIOID){
    this.router.navigateByUrl(`/Siguiendo?Page=${seguir.USUARIO}`);
  }

  adminPage(){
    this.router.navigateByUrl('/Admins');
  }


  DellList(LIst:ListItem){
    this.BackendService.dellList(new ID_LISTAiTEM(LIst.ID_LISTA)).subscribe((x:any)=>{
      if(x.status == 1 ){
        this.refresh();
      }
    });

  }

  
  EditList(LIst:ListItem){
    if(localStorage.getItem("id") != null)
    this.router.navigateByUrl(`/EditarLista?ID_LISTA=${LIst.ID_LISTA}&NOMBRE=${LIst.NOMBRE}`);
  }


  sequence(){
    //if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/sequence');
    //else
    //this.ngxToastService.onWarning('Fail','por favor iniciar sesión');
  }

  records(){
    //if(localStorage.getItem("id") != null)
    this.router.navigateByUrl('/records');
    //else
    //this.ngxToastService.onWarning('Fail','por favor iniciar sesión');
  }


  
}




