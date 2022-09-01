import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { userItem } from 'src/app/models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    LoginUser: userItem[];
    userItem:  userItem;
  constructor(private router:Router,
              private BackendService: BackendService,
              private fb: FormBuilder) {
                this.form = this.fb.group({
                  USUARIO: [''],
                  CONTRASEÑA: [''],
                });
                this.LoginUser = [];
                this.userItem = this.LoginUser[0];

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
        localStorage.setItem("type", "user");
        localStorage.setItem("name", this.userItem.USUARIO);
        //alert(this.userItem.ID);
        this.router.navigateByUrl('/');
      }
      
         
    });
    console.log(this.form.value);
  }


  register(){
    this.router.navigateByUrl('/register');
  }

}
