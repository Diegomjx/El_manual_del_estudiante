import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApuntesItem, IDandID_PDFItem, IDItem } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-megusta',
  templateUrl: './megusta.component.html',
  styleUrls: ['./megusta.component.scss']
})
export class MegustaComponent implements OnInit {
  Apuntes: ApuntesItem[];
  isClicked = false;
  isChecked = false;
  displayedColumns: string[] = ['1'];
 

  constructor(private backend: BackendService,
              private router:Router,
              private sanitizer: DomSanitizer) { 
              this.Apuntes = [];
              

              }
  transform(url:string) {
                return this.sanitizer.bypassSecurityTrustResourceUrl( `http://localhost:9000/${url}#toolbar=0&navpanes=0&scrollbar=0`);
              }

  ngOnInit(): void {
    this.backend.getMegusta(new IDItem( parseInt(localStorage.getItem("id")||"0") )).subscribe(x =>{
      if(x.status ==1)
      this.Apuntes = x.result;
      console.log(this.Apuntes);
    });




  
  }

  SHOW(APUNTE:ApuntesItem){
    if((localStorage.getItem("id")||"0") != "0")
    this.backend.addPDFenHistorial(new IDandID_PDFItem( parseInt(localStorage.getItem("id")||"0"),APUNTE.ID_PDF)).subscribe((res)=>{});
    this.router.navigateByUrl(`/LookPDF?NOMBRE=${APUNTE.NOMBRE}&ID_PDF=${APUNTE.ID_PDF}&PDF=${APUNTE.PDF}&MEGUSTA=${APUNTE.Megusta}&APRUBE=${APUNTE.APRUBE}`);
  }
  SHARE(APUNTE:ApuntesItem){
    return `http://localhost:4200//LookPDF?NOMBRE=${APUNTE.NOMBRE}&ID_PDF=${APUNTE.ID_PDF}&PDF=${APUNTE.PDF}&MEGUSTA=${APUNTE.Megusta}&APRUBE=${APUNTE.APRUBE}`
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
