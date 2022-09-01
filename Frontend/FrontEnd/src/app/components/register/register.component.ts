import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
              private fb: FormBuilder) { 
                this.form = this.fb.group({
                  USUARIO: [''],
                  CONTRASEÑA: [''],
                  Nombre: [''],
                  CORREO: ['']

                });
              }


  ngOnInit(): void { 
  }

  addUser(){
    this.BackendService.addUser(
      this.form.controls['USUARIO'].value,
      this.form.controls['CONTRASEÑA'].value,
      this.form.controls['Nombre'].value,
      this.form.controls['CORREO'].value
    ).subscribe((res:any)=>{
      if (res.msg == "usuario insertado satisfactoriamente") {
        alert(res.msg);
        this.router.navigateByUrl('/login');
      }else{
        alert(res.msg);
      }
      
     
      
    })
    console.log(this.form.value)
  }

  home(){
    this.router.navigateByUrl('/home');
  }



}
