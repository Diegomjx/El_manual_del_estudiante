import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApuntesItem } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser"; 
import { ComunicacionService } from 'src/app/services/comunicacion.service';
@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit, PipeTransform  {
  Apuntes: ApuntesItem[];
  displayedColumns: string[] = ['1'];
 

  constructor(private backend: BackendService,
              private router:Router,
              private data: ComunicacionService,
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
    this.data.showNotes(APUNTE);
    this.router.navigateByUrl("/LookPDF");
  }





}

