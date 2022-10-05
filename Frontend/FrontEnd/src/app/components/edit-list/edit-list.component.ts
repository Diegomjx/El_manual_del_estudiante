import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';
import { ListItem } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  form: FormGroup;
  constructor(
              private router:Router,
              private route:ActivatedRoute,
              private BackendService:BackendService,
              private fb: FormBuilder,
              private ngxToastService: NgxToastService
              ) {
                this.route.queryParams.subscribe(params=>{
                  this.form = this.fb.group({
                    NOMBRE: [params['NOMBRE']],
                    ID_LISTA:[params['ID_LISTA']]
                                          });
                });
                

               }

  ngOnInit(): void {
  }


  UpdateList(): any{
    try{
    const id = localStorage.getItem("id") || "-1";
    if(id != "-1" && this.form.controls['NOMBRE'].value != '' ){
   
    this.BackendService.updateList(
      new ListItem( parseInt(id) ,this.form.controls['NOMBRE'].value, this.form.controls['ID_LISTA'].value)
    ).subscribe((res:any)=>{
      if (res.msg == "ok") {
        this.ngxToastService.onSuccess('Enviado','Lista Modificada satisfactoriamente');
        this.router.navigateByUrl('/');
      }else{
        this.ngxToastService.onDanger('Error','No se pudo modificar la lista');
      }
    });
  }else{
    this.ngxToastService.onWarning('Fail','por favor Ingrese los datos');
  }
  }catch(e){
    console.log('ERROR',e);
  } 
      
  }

}
