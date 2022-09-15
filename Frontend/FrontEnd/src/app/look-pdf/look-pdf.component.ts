import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApuntesItem, IDandID_PDFItem, IDItem, ID_LISTAandID_PDFItem, ListItem, LIstofListwhithPDFItem } from '../models/models';
import { ComunicacionService } from '../services/comunicacion.service';
import { Pipe, PipeTransform } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { NgxToastService } from 'ngx-toast-notifier';

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

  constructor(
    private backend: BackendService,
    private fb: FormBuilder,
    private data: ComunicacionService,
    private sanitizer: DomSanitizer,
    private ngxToastService: NgxToastService
  ) { 
    this.ShowApunte = new ApuntesItem(0,0,'PDF de muestra','muestra.pdf',0);
    this.form = this.fb.group({
      nombre: ['PDF de muestra'],
      ID_PDF: ['-12'],
      PDF: ['muestra.pdf'],

    });

    this.Lista = [];
    let esperar = -1;
    this.data.currentAPUNTE.subscribe(x => {
      if(x.PDF != '')
      this.form = this.fb.group({
        nombre: [x.NOMBRE],
        ID_PDF: [x.ID_PDF],
        PDF: [x.PDF],

      });
      if(x.PDF != '')
      this.ShowApunte = x;
    });

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
    return this.sanitizer.bypassSecurityTrustResourceUrl( `http://localhost:9000/${url}#toolbar=0`);
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

}
