import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApuntesItem } from '../models/models';
import { ComunicacionService } from '../services/comunicacion.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-look-pdf',
  templateUrl: './look-pdf.component.html',
  styleUrls: ['./look-pdf.component.scss']
})
export class LookPDFComponent implements OnInit,PipeTransform {
  ShowApunte: ApuntesItem;
  form:FormGroup;
  constructor(
    private fb: FormBuilder,
    private data: ComunicacionService,
    private sanitizer: DomSanitizer
  ) { 
    this.ShowApunte = new ApuntesItem(0,0,'','');
    this.form = this.fb.group({
      nombre: [''],
      ID_PDF: [''],
      PDF: [''],

    });

    this.data.currentAPUNTE.subscribe(x => {
      this.form = this.fb.group({
        nombre: [x.NOMBRE],
        ID_PDF: [x.ID_PDF],
        PDF: [x.PDF],

      });
      this.ShowApunte = x;
    })
  }


  transform(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl( `http://localhost:9000/${url}#toolbar=0&navpanes=0&scrollbar=0&embedded=true`);
  }

  ngOnInit(): void {
  }

}
