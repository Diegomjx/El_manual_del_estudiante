import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApuntesItem, IDandID_PDFItem } from '../models/models';
import { BackendService } from '../services/backend.service';


@Component({
  selector: 'app-mi-notes',
  templateUrl: './mi-notes.component.html',
  styleUrls: ['./mi-notes.component.scss']
})
export class MiNotesComponent implements OnInit {
  Apuntes: ApuntesItem[];
  displayedColumns: string[] = ['1'];


  constructor(private backend: BackendService,

              private router:Router,
              private sanitizer: DomSanitizer) { 

              this.backend.getPDFID(
                  parseInt(localStorage.getItem("id") ||"0") 
                ).subscribe(x =>{
                  if(x.status ==1)
                  this.Apuntes = x.result;
                  console.log(this.Apuntes);
                });

              }
            
  transform(url:string) {
                return this.sanitizer.bypassSecurityTrustResourceUrl( `http://localhost:9000/${url}#toolbar=0&navpanes=0&scrollbar=0`);
              }

  ngOnInit(): void {
    
    this.backend.getPDFID(
      parseInt(localStorage.getItem("id") ||"0") 
    ).subscribe(x =>{
      if(x.status ==1)
      this.Apuntes = x.result;
      console.log(this.Apuntes);
    });

    }


  SHOW(APUNTE:ApuntesItem){
    if((localStorage.getItem("id")||"0") != "0")
    this.backend.addPDFenHistorial(new IDandID_PDFItem( parseInt(localStorage.getItem("id")||"0"),APUNTE.ID_PDF)).subscribe((res)=>{});
    this.router.navigateByUrl(`/LookPDF?NOMBRE=${APUNTE.NOMBRE}&ID_PDF=${APUNTE.ID_PDF}&PDF=${APUNTE.PDF}&MEGUSTA=${APUNTE.Megusta}`);
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

  DellApunte(APUNTE:ApuntesItem){
    if((localStorage.getItem("id")||"0") != "0"){
        this.backend.dellPDF(APUNTE.ID_PDF).subscribe((res)=>{
          if(res.status === 1){
            this.backend.getPDFID(
              parseInt(localStorage.getItem("id") ||"0") 
            ).subscribe(x =>{
              if(x.status ==1)
              this.Apuntes = x.result;
              console.log(this.Apuntes);
            });
          }
        });
    }
  }
}
