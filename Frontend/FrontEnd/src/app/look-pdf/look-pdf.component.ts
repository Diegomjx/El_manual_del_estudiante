import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApuntesItem, ExistInList, IDItem, ListItem } from '../models/models';
import { ComunicacionService } from '../services/comunicacion.service';
import { Pipe, PipeTransform } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-look-pdf',
  templateUrl: './look-pdf.component.html',
  styleUrls: ['./look-pdf.component.scss']
})
export class LookPDFComponent implements OnInit,PipeTransform {
  ShowApunte: ApuntesItem;
  form:FormGroup;
  isChecked = false;
  Lista: ListItem[];

  constructor(
    private backend: BackendService,
    private fb: FormBuilder,
    private data: ComunicacionService,
    private sanitizer: DomSanitizer
  ) { 
    this.ShowApunte = new ApuntesItem(0,0,'PDF de muestra','muestra.pdf',0);
    this.form = this.fb.group({
      nombre: ['PDF de muestra'],
      ID_PDF: ['-12'],
      PDF: ['muestra.pdf'],

    });

    this.Lista = [];

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
    this.backend.getLists( 
      new IDItem(parseInt(id))
    ).subscribe((x:any)=>{
      if(x.msg == "ok"){
        this.Lista = x.result;
      }
    });


  }


  transform(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl( `http://localhost:9000/${url}#toolbar=0`);
  }

  ngOnInit(): void {
    
  }

  addToList(Lista:ListItem){
//    console.log(Lista);
//    console.log(this.ShowApunte);
  }

   checkboxes(ID_LISTA:number){
    console.log(ID_LISTA);
   /* const id = localStorage.getItem("id") || "-1";
    var ret =false;
    /*this.backend.getExistInList( new ExistInList(ID_LISTA, parseInt(id) , this.form.controls['ID_PDF'].value)  ).subscribe((x:any)=>{
      if(x.msg == "ok" && x.bool == 1 ){
        ret=true;
      }
    });*/

    //const checkbox = document.getElementById(id.toString());
    //console.log(checkbox);
    return true;
  }

}
