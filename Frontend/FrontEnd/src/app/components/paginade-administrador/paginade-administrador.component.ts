import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { adminPeticion, ApuntesItem, IDandID_PDFItem, ID_PDFItem } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-paginade-administrador',
  templateUrl: './paginade-administrador.component.html',
  styleUrls: ['./paginade-administrador.component.scss']
})
export class PaginadeAdministradorComponent implements OnInit {
  form: FormGroup;
  displayedColumns: string[] = ['PDF','NOMBRE'];
  Apuntes: ApuntesItem[];
  dataSource:MatTableDataSource<ApuntesItem>;
  Revised: false;
  constructor(
    private fb: FormBuilder,
    private BackendService: BackendService,
    private sanitizer: DomSanitizer,
    private router:Router,
  ) { 
    this.form = this.fb.group({
      Buscar: [''],
    });

    

  }

  ngOnInit(): void {
    this.BackendService.getApuntesRevisedorNot(new adminPeticion(0, parseInt(localStorage.getItem("id")||"0"))).subscribe((res:any)=>{
      if(res.status ==1){
        this.Apuntes = res.result;
        this.dataSource = new MatTableDataSource(this.Apuntes);
        console.log(this.Apuntes);
      }
    });
  }

  Search(){
    if(this.form.controls['Buscar'].value != ''){
      this.BackendService.Find(this.form.controls['Buscar'].value, parseInt(localStorage.getItem("id")||"0")).subscribe((res:any)=>{
        if(res.status ==1)
        this.Apuntes = res.result;
        this.dataSource = new MatTableDataSource( this.Apuntes);
        console.log(this.Apuntes);

      });
    }

    

  }

  applyFilter(filterValue: string){
    this.dataSource.filter =filterValue.trim().toLowerCase();

  }

  transform(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl( `http://localhost:9000/${url}#toolbar=0&navpanes=0&scrollbar=0`);
  }

  SHOW(APUNTE:ApuntesItem){
    if((localStorage.getItem("id")||"0") != "0")
    this.BackendService.addPDFenHistorial(new IDandID_PDFItem( parseInt(localStorage.getItem("id")||"0"),APUNTE.ID_PDF)).subscribe((res)=>{});
    this.router.navigateByUrl(`/LookPDF?NOMBRE=${APUNTE.NOMBRE}&ID_PDF=${APUNTE.ID_PDF}&PDF=${APUNTE.PDF}&MEGUSTA=${APUNTE.Megusta}&APRUBE=${APUNTE.APRUBE}`);
  }

  MeGusta(APUNTE:ApuntesItem){
    if((localStorage.getItem("id")||"0") != "0"){
      if(APUNTE.Megusta.toLowerCase() === 'true'){
        APUNTE.Megusta='false';
        this.BackendService.dellMegusta(new IDandID_PDFItem( parseInt(localStorage.getItem("id")||"0"),APUNTE.ID_PDF)).subscribe((res)=>{});
      }

      else{
        APUNTE.Megusta='true';
        this.BackendService.addMegusta(new IDandID_PDFItem( parseInt(localStorage.getItem("id")||"0"),APUNTE.ID_PDF)).subscribe((res)=>{});
      }

    }

}

AprobadooNo(APUNTE:ApuntesItem){
  if((localStorage.getItem("id")||"0") != "0"){
    if(APUNTE.APRUBE == 1){
      APUNTE.APRUBE=0;
     this.BackendService.disapproved(new ID_PDFItem( APUNTE.ID_PDF)).subscribe((res)=>{});
    }

    else{
      APUNTE.APRUBE=1;
      this.BackendService.Aprube(new ID_PDFItem( APUNTE.ID_PDF)).subscribe((res)=>{});
    }

  }

}


opctionRevised(){
  if(!this.Revised){
    this.BackendService.getApuntesRevisedorNot(new adminPeticion(1, parseInt(localStorage.getItem("id")||"0"))).subscribe((res:any)=>{
      if(res.status ==1){
        this.Apuntes = res.result;
        this.dataSource = new MatTableDataSource(this.Apuntes);
        console.log(this.Apuntes);
      }
    });
  }else{
    this.BackendService.getApuntesRevisedorNot(new adminPeticion(0, parseInt(localStorage.getItem("id")||"0"))).subscribe((res:any)=>{
      if(res.status ==1){
        this.Apuntes = res.result;
        this.dataSource = new MatTableDataSource(this.Apuntes);
        console.log(this.Apuntes);
      }
    });

  }

}

update(){
  if(this.Revised){
    this.BackendService.getApuntesRevisedorNot(new adminPeticion(1, parseInt(localStorage.getItem("id")||"0"))).subscribe((res:any)=>{
      if(res.status ==1){
        this.Apuntes = res.result;
        this.dataSource = new MatTableDataSource(this.Apuntes);
        console.log(this.Apuntes);
      }
    });
  }else{
    this.BackendService.getApuntesRevisedorNot(new adminPeticion(0, parseInt(localStorage.getItem("id")||"0"))).subscribe((res:any)=>{
      if(res.status ==1){
        this.Apuntes = res.result;
        this.dataSource = new MatTableDataSource(this.Apuntes);
        console.log(this.Apuntes);
      }
    });

  }

}

}


