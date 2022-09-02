import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { response } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  public files:any=[]
  file_name='';

  form: FormGroup;
  constructor(private router:Router,
              private BackendService:BackendService,
              private fb: FormBuilder
              ) {this.form = this.fb.group({
                File: [this.files],
                NAME: ['']
              });


               }

  ngOnInit(): void {
  }

  pdfInputChange(fileInputEvent: any) {
    this.files=fileInputEvent.target.files[0];
    //console.log(fileInputEvent.target.files[0]);
    this.file_name=fileInputEvent.target.files[0].name;
    console.log(this.file_name);
    console.log(this.files);
  }

  pdf_name(){
    return this.file_name;
  }

  uploadFile(){
    
    this.BackendService.addPDF(
      this.files,
      this.form.controls['NAME'].value
    ).subscribe((res:any)=>{
      if (res.msg == "usuario insertado satisfactoriamente") {
        alert(res.msg);
        this.router.navigateByUrl('/login');
      }else{
        alert(res.msg);
      }
    });
      
  
  }


}
