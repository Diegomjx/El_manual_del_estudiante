import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';
import { ListItem, ListItemsend } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-crete-list',
  templateUrl: './crete-list.component.html',
  styleUrls: ['./crete-list.component.scss']
})
export class CreteListComponent implements OnInit {

  form: FormGroup;
  constructor(
              private router:Router,
              private BackendService:BackendService,
              private fb: FormBuilder,
              private ngxToastService: NgxToastService
              ) {
                
                this.form = this.fb.group({
                  NOMBRE: ['']
                                        });
               }

  ngOnInit(): void {
  }


  CreateList(): any{
    try{
    const id = localStorage.getItem("id") || "-1";
    if(id != "-1" && this.form.controls['NOMBRE'].value != '' ){
   
    this.BackendService.addList(
      new ListItemsend( parseInt(id) ,this.form.controls['NOMBRE'].value)
    ).subscribe((res:any)=>{
      if (res.msg == "ok") {
        this.ngxToastService.onSuccess('Enviado','Lista agregada satisfactoriamente');
        this.router.navigateByUrl('/');
      }else{
        this.ngxToastService.onDanger('Error','No se pudo crear la lista');
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
