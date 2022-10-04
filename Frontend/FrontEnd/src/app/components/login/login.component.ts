import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { userItem } from 'src/app/models/models';
import { NgxToastService } from 'ngx-toast-notifier';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    LoginUser: userItem[];
    userItem:  userItem;
    name:string;

    @Output() messageEvent = new EventEmitter<string>();

  constructor(private router:Router,
              private serviceComunicate: ComunicacionService,
              private BackendService: BackendService,
              private fb: FormBuilder,
              private ngxToastService: NgxToastService) {
                this.form = this.fb.group({
                  USUARIO: [''],
                  CONTRASEÑA: [''],
                });
                this.LoginUser = [];
                this.userItem = this.LoginUser[0];
                this.name = 'User';
               }

  ngOnInit(): void {
    
  }

  getUser() {
    this.BackendService.getUser(
      this.form.controls['USUARIO'].value,
      this.form.controls['CONTRASEÑA'].value,
    ).subscribe((res:any)=>{
      if(res.status == 1){
        this.userItem =  res.result[0];
        localStorage.setItem("id", (this.userItem.ID).toString() );
        localStorage.setItem("Rol", this.userItem.Rol);
        localStorage.setItem("name", this.userItem.USUARIO);
        //alert(this.userItem.ID);
        this.serviceComunicate.enviarnombre(this.userItem.USUARIO);
        this.router.navigateByUrl('/');
        this.ngxToastService.onSuccess(' bienvenido',this.userItem.USUARIO);
      }
      else
      this.ngxToastService.onWarning('Denegado','Usuario o contraseña incorrecto');
    });
   // console.log(this.form.value);
  }


  register(){
    this.router.navigateByUrl('/register');
  }

}
