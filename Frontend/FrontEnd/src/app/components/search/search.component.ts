import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApuntesItem, IDandID_PDFItem } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';

export interface PeriodicElement {
  UserName: string;
  DocumentName: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {DocumentName: 'Doc',     UserName: 'Julio', weight: 1.0079, symbol: 'H'},
  {DocumentName: 'Doc-123', UserName: 'Diego', weight: 4.0026, symbol: 'He'},
  {DocumentName: 'Docssss', UserName: 'Mario', weight: 6.941, symbol: 'Li'},
  {DocumentName: 'PDF- mate - Algebra', UserName: 'Elias', weight: 9.0122, symbol: 'Be'},
  {DocumentName: 'SS- Conquista', UserName: 'Baron', weight: 10.811, symbol: 'B'},
  {DocumentName: 'sadfsadfsadf', UserName: 'Donald', weight: 12.0107, symbol: 'C'},
  {DocumentName: 'Quimica Organica', UserName: 'Donald', weight: 14.0067, symbol: 'N'},
  {DocumentName: 'doc(1)(1)', UserName: 'Elias', weight: 15.9994, symbol: 'O'},
  {DocumentName: 'default', UserName: 'Flu', weight: 18.9984, symbol: 'F'},
  {DocumentName: 'Doc1', UserName: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  displayedColumns: string[] = ['PDF','NOMBRE'];
  Apuntes: ApuntesItem[];
  dataSource:MatTableDataSource<ApuntesItem>;

  constructor(
    private backend: BackendService,
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
