import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApuntesItem } from '../models/models';
import { BackendService } from '../services/backend.service';
import { ComunicacionService } from '../services/comunicacion.service';

@Component({
  selector: 'app-mi-notes',
  templateUrl: './mi-notes.component.html',
  styleUrls: ['./mi-notes.component.scss']
})
export class MiNotesComponent implements OnInit {
  Apuntes: ApuntesItem[];
  displayedColumns: string[] = ['1'];


  constructor(private backend: BackendService,
              private data: ComunicacionService,
              private router:Router,
              private sanitizer: DomSanitizer) { 
              this.Apuntes = [];

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
    this.data.showNotes(APUNTE);
    this.router.navigateByUrl("/LookPDF");
  }

}
