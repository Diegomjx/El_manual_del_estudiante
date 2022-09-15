import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApuntesItem, IDItem, ListItem } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser"; 

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit, PipeTransform  {
  Apuntes: ApuntesItem[];

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
    this.backend.getPDFs().subscribe(x =>{
      if(x.status ==1)
      this.Apuntes = x.result;
      console.log(this.Apuntes);
    });




  
  }

  SHOW(APUNTE:ApuntesItem){
    this.router.navigateByUrl(`/LookPDF?NOMBRE=${APUNTE.NOMBRE}&ID_PDF=${APUNTE.ID_PDF}&PDF=${APUNTE.PDF}`);
  }







}

