import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';
import { response } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private router:Router,
              private BackendService:BackendService,
              private fb: FormBuilder,
              private ngxToastService: NgxToastService) { 
                this.form = this.fb.group({
                  USUARIO: [''],
                  CONTRASEÑA: [''],
                  Confirmar_P: [''],
                  Nombre: [''],
                  CORREO: ['']

                });
              }


  ngOnInit(): void { 
  }

  addUser(){
    if(this.form.controls['USUARIO'].value =='' ||
    this.form.controls['CONTRASEÑA'].value =='' ||
    this.form.controls['Nombre'].value=='' ||
    this.form.controls['CORREO'].value =='' ||
    this.form.controls['Confirmar_P'].value =='' ||
    this.form.controls['Confirmar_P'].value != this.form.controls['CONTRASEÑA'].value){
      this.ngxToastService.onWarning('DATOS INCORRECTOS', 'Faltan datos o Se ingresaron erroneamente los datos');
      return;
    }
    this.BackendService.addUser(
      this.form.controls['USUARIO'].value,
      this.form.controls['CONTRASEÑA'].value,
      this.form.controls['Nombre'].value,
      this.form.controls['CORREO'].value
    ).subscribe((res:any)=>{
      if (res.msg == "usuario insertado satisfactoriamente") {
        this.ngxToastService.onSuccess('Done','Se registro correctamente');
        this.router.navigateByUrl('/login');
      }else{
        this.ngxToastService.onWarning('DATOS INCORRECTOS', 'Se ingresaron erroneamente los datos');
      }
      
     
      
    })
    console.log(this.form.value)
  }

  home(){
    this.router.navigateByUrl('/home');
  }



}
