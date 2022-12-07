import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApuntesItem, IDandID_PDFItem, IDSeguidorandIDSiguiendo, USUARIOID, USUARIOIDC } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-visitante',
  templateUrl: './visitante.component.html',
  styleUrls: ['./visitante.component.scss']
})
export class VisitanteComponent implements OnInit {
  Apuntes: ApuntesItem[];
  displayedColumns: string[] = ['1'];
  seguir: USUARIOIDC;
  Usuario: string = '';
  form:FormGroup;

  constructor(private backend: BackendService,
              private router:Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { 
                this.form = this.fb.group({
                  SEGUIR: ['false']
                })
              }
            
  transform(url:string) {
                return this.sanitizer.bypassSecurityTrustResourceUrl( `http://localhost:9000/${url}#toolbar=0&navpanes=0&scrollbar=0`);
              }

  ngOnInit(): void {
  

    this.route.queryParams
    .subscribe(params => {

      this.Usuario = params['Page'].toString();
      this.backend.getApuntesInvitado(
        new USUARIOID( this.Usuario,parseInt((localStorage.getItem("id")||"0")  ))
      ).subscribe(x =>{
        if(x.status ==1)
        this.Apuntes = x.result;

      });

      //peticion con user
      this.backend.getSiguiendowhithUSER(new USUARIOID(this.Usuario,parseInt((localStorage.getItem("id")||"0") ))
      ).subscribe(x =>{
        if(x.status ==1)
        this.seguir = x.result;
        this.form.value['SEGUIR'] = this.seguir.c;

      });
     }
  );


    }


  SHOW(APUNTE:ApuntesItem){
    if((localStorage.getItem("id")||"0") != "0")
    this.backend.addPDFenHistorial(new IDandID_PDFItem( parseInt(localStorage.getItem("id")||"0"),APUNTE.ID_PDF)).subscribe((res)=>{});
    this.router.navigateByUrl(`/LookPDF?NOMBRE=${APUNTE.NOMBRE}&ID_PDF=${APUNTE.ID_PDF}&PDF=${APUNTE.PDF}&MEGUSTA=${APUNTE.Megusta}&APRUBE=${APUNTE.APRUBE}`);
  }
  SHARE(APUNTE:ApuntesItem){
    return `http://localhost:4200//LookPDF?NOMBRE=${APUNTE.NOMBRE}&ID_PDF=${APUNTE.ID_PDF}&PDF=${APUNTE.PDF}&MEGUSTA=${APUNTE.Megusta}&APRUBE=${APUNTE.APRUBE}`
  }
  SHARE2(){
    return window.location.href;
  }
  
  MeGusta(APUNTE:ApuntesItem){
    if((localStorage.getItem("id")||"0") != "0"){
      if(APUNTE.Megusta.toLowerCase() === 'true'){
        APUNTE.Megusta='false';
        this.backend.dellMegusta(new IDandID_PDFItem( parseInt(localStorage.getItem("id")||"0"),APUNTE.ID_PDF)).subscribe((res)=>{});
      }

      else{
        APUNTE.Megusta='true';
        this.backend.addMegusta(new IDandID_PDFItem( parseInt(localStorage.getItem("id")||"0"),APUNTE.ID_PDF)).subscribe((res)=>{});
      }

    }

}


Seguir(){
  if((localStorage.getItem("id")||"0") != "0" && parseInt(localStorage.getItem("id")||"0") != this.seguir.ID ){
    if(this.form.value['SEGUIR'].toLowerCase() === 'true'){
      this.form.value['SEGUIR']='false';
      this.backend.dellSeguidor(new IDSeguidorandIDSiguiendo( parseInt(localStorage.getItem("id")||"0"),this.seguir.ID)).subscribe((res)=>{});
    }
    else{
      this.form.value['SEGUIR']='true';
      this.backend.addSeguidor(new IDSeguidorandIDSiguiendo( parseInt(localStorage.getItem("id")||"0"),this.seguir.ID)).subscribe((res)=>{});
    }

  }
}




}
