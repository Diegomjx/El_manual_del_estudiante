import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';
import { UpdateApuntesItem } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.scss']
})
export class EditNotesComponent implements OnInit {
  form:FormGroup;

  constructor(
    private backend: BackendService,
    private fb: FormBuilder,
    private ngxToastService: NgxToastService,
    private route: ActivatedRoute, 
    private router: Router
  ) { 

    this.route.queryParams
    .subscribe(params => {

      this.form = this.fb.group({
        NOMBRE: [params['NOMBRE']],
        ID_PDF: [params['ID_PDF']],
      });
    });

  }

  ngOnInit(): void {
  }

  updatePDF(){
    this.backend.UpdatePDFByIDPDF(
      new UpdateApuntesItem(this.form.value['ID_PDF'],this.form.value['NOMBRE'])
    ).subscribe((x:any)=>{
      if(x.msg == "ok"){
        this.ngxToastService.onSuccess('Actualizado','Se Actualizado satisfactoriamente');
        this.router.navigateByUrl('/MiNotes');
      }
     

    });
  }

}
