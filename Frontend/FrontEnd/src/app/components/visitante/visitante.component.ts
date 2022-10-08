import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApuntesItem, IDandID_PDFItem, USUARIOID, USUARIOIDC } from 'src/app/models/models';
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


  constructor(private backend: BackendService,
              private router:Router,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { 
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
        console.log(this.Apuntes);
      });

      //hacemos la peticion o usamos user para hacer todo el proceso??

    }
  );


    }


  SHOW(APUNTE:ApuntesItem){
    if((localStorage.getItem("id")||"0") != "0")
    this.backend.addPDFenHistorial(new IDandID_PDFItem( parseInt(localStorage.getItem("id")||"0"),APUNTE.ID_PDF)).subscribe((res)=>{});
    this.router.navigateByUrl(`/LookPDF?NOMBRE=${APUNTE.NOMBRE}&ID_PDF=${APUNTE.ID_PDF}&PDF=${APUNTE.PDF}&MEGUSTA=${APUNTE.Megusta}&APRUBE=${APUNTE.APRUBE}`);
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




}
