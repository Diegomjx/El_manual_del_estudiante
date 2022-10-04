import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApuntesItem, IDandID_PDFItem, IDItem, ID_LISTAandID_PDFItem, ID_PDFItem, ListItem, LIstofListwhithPDFItem } from '../models/models';
import { ComunicacionService } from '../services/comunicacion.service';
import { Pipe, PipeTransform } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { NgxToastService } from 'ngx-toast-notifier';
import { ActivatedRoute } from '@angular/router';

export interface IHash {
  [details:number] : boolean;
}

@Component({
  selector: 'app-look-pdf',
  templateUrl: './look-pdf.component.html',
  styleUrls: ['./look-pdf.component.scss']
})

export class LookPDFComponent implements OnInit,PipeTransform {
  ShowApunte: ApuntesItem;
  form:FormGroup;
  isChecked = false;
  Lista: LIstofListwhithPDFItem[];
  myhash: IHash={};
  Rol=localStorage.getItem('Rol')||"";

  constructor(
    private backend: BackendService,
    private fb: FormBuilder,
    private data: ComunicacionService,
    private sanitizer: DomSanitizer,
    private ngxToastService: NgxToastService,
    private route: ActivatedRoute
  ) { 
    this.form = this.fb.group({
      nombre: ['PDF de muestra'],
      ID_PDF: ['-12'],
      PDF: ['muestra.pdf'],
      MEGUSTA: ['false']

    });

    this.Lista = [];
/*
    this.data.currentAPUNTE.subscribe(x => {
      if(x.PDF != '')
      this.form = this.fb.group({
        nombre: [x.NOMBRE],
        ID_PDF: [x.ID_PDF],
        PDF: [x.PDF],

      });

    });*/

    this.route.queryParams
    .subscribe(params => {

      this.form = this.fb.group({
        nombre: [params['NOMBRE']],
        ID_PDF: [params['ID_PDF']],
        PDF: [params['PDF']],
        MEGUSTA: [params['MEGUSTA']],
        APRUBE: [params['APRUBE']]

      });

    }
  );
  

    const id = localStorage.getItem("id") || "-1";

   this.backend.getPDFNameAndassociativList(
    new IDandID_PDFItem(parseInt(id),this.form.value['ID_PDF'])
   ).subscribe((X:any)=>{
    if(X.msg == "ok"){
      this.Lista = X.result;
      console.log(this.Lista);
    }
   });

  } //fin del constructor.


  


  transform(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl( `http://localhost:9000/${url}#toolbar=1`);
  }

  ngOnInit(): void {
    
  }

  addToList(Lista:LIstofListwhithPDFItem, e:any ){
    if(e.target.checked ){

      this.backend.addPDFinList(new ID_LISTAandID_PDFItem(Lista.ID_LISTA, this.form.value['ID_PDF']) )
      .subscribe((X:any)=>{
        if(X.msg == "ok"){
          this.ngxToastService.onSuccess('Agregado','Se agrego satisfactoriamente');
        }

       });
    }else{

      this.backend.dellPDFinList(new ID_LISTAandID_PDFItem(Lista.ID_LISTA, this.form.value['ID_PDF']) )
      .subscribe((X:any)=>{
        if(X.msg == "ok"){
          this.ngxToastService.onSuccess('Eliminado','Se elimino satisfactoriamente');
        }
       });

    }

  }

  MeGusta(){
    if((localStorage.getItem("id")||"0") != "0"  ){
      if(this.form.value['MEGUSTA'].toLowerCase() === 'true'){
        this.form.value['MEGUSTA']='false';
        this.backend.dellMegusta(new IDandID_PDFItem( parseInt(localStorage.getItem("id")||"0"),this.form.value['ID_PDF'])).subscribe((res)=>{});
      }

      else{
        this.form.value['MEGUSTA']='true';
        this.backend.addMegusta(new IDandID_PDFItem( parseInt(localStorage.getItem("id")||"0"),this.form.value['ID_PDF'])).subscribe((res)=>{});
      }

    }

}

AprobadooNo(){
  if((localStorage.getItem("id")||"0") != "0"){
    if(this.form.value['APRUBE']== 1){
      this.form.value['APRUBE']= 0;
     this.backend.disapproved(new ID_PDFItem( this.form.value['ID_PDF'])).subscribe((res)=>{});
    }

    else{
      this.form.value['APRUBE']= 1;
      this.backend.Aprube(new ID_PDFItem( this.form.value['ID_PDF'])).subscribe((res)=>{});
    }

  }

}

}
