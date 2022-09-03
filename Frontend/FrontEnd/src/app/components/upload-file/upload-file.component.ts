import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
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
  public files_:any=[]
  private fileTemp:any;
  file_name='';

  form: FormGroup;
  constructor(
              private router:Router,
              private BackendService:BackendService,
              private fb: FormBuilder
              ) {this.form = this.fb.group({
                File: [this.files_],
                NAME: ['']
              });


               }

  ngOnInit(): void {
  }

  pdfInputChange(fileInputEvent: any) {
    this.files_=fileInputEvent.target.files[0];
    //console.log(fileInputEvent.target.files[0]);
    this.file_name=fileInputEvent.target.files[0].name;
  //  console.log(this.file_name);
  //  console.log(this.files);
    /******************* */

    const [file]=fileInputEvent.target.files;
    this.fileTemp = {
      fileRaw:file,
      fileName:file.name
    }



  }

  pdf_name(){
    return this.file_name;
  }
/*
  uploadFile(): any{
    try{
    const formularioDeDatos = new FormData();
    formularioDeDatos.append('files',this.files_);
    this.BackendService.addPDF(
      this.files_,
      this.form.controls['NAME'].value
    ).subscribe((res:any)=>{
      if (res.msg == "usuario insertado satisfactoriamente") {
        alert(res.msg);
        this.router.navigateByUrl('/login');
      }else{
        alert(res.msg);
      }
    });
  }catch(e){
    console.log('ERROR',e);
  }*/

  uploadFile(): any{
    try{
    const id = localStorage.getItem("id") || "-1";
    if(id != "-1" && this.form.controls['NAME'].value != '' ){
    const formularioDeDatos = new FormData();
    formularioDeDatos.append('files',this.fileTemp.fileRaw, this.fileTemp.fileName);
    formularioDeDatos.append('NAME', this.form.controls['NAME'].value);
    formularioDeDatos.append('ID', id );
   //agregar un apend 
    this.BackendService.addPDF(
      formularioDeDatos
    ).subscribe((res:any)=>{
      if (res.msg == "ok") {
        alert(res.msg);
        this.router.navigateByUrl('/login');
      }else{
        alert(res.msg);
      }
    });
  }
  }catch(e){
    console.log('ERROR',e);
  }
      
  
  }


}
