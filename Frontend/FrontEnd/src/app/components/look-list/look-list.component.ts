import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApuntesItem, IDandID_ListItem, IDandID_PDFItem, ID_LISTAiTEM } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-look-list',
  templateUrl: './look-list.component.html',
  styleUrls: ['./look-list.component.scss']
})
export class LookListComponent implements OnInit {
  Apuntes: ApuntesItem[];
  displayedColumns: string[] = ['1'];
  @Input() ID_list:number = 0;

  constructor(private backend: BackendService,
              private router:Router,
              private sanitizer: DomSanitizer,
              private serviceComunicate: ComunicacionService,
              private routes: ActivatedRoute) { 
              this.Apuntes = [];
              this.ID_list=0;
              }

              
  transform(url:string) {
                return this.sanitizer.bypassSecurityTrustResourceUrl( `http://localhost:9000/${url}#toolbar=0&navpanes=0&scrollbar=0`);
              }

    ngOnInit(): void {
      this.serviceComunicate.currentList.subscribe(lista=>{
      this.ID_list= lista.ID_LISTA;
    });
    this.routes.queryParams
    .subscribe(params => {
      this.ID_list= parseInt(params['ID_LISTA'].toString() );
      this.backend.getPDFinList(
        new IDandID_ListItem(
          parseInt((localStorage.getItem("id")||"0")  ),
          this.ID_list
        )
      ).subscribe(x =>{
        if(x.status ==1)
        this.Apuntes = x.result;
        console.log(this.Apuntes);
      });
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
