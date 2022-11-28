import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxToastNotifierService, NgxToastService } from 'ngx-toast-notifier';
import { ID_Name_type, itemresponsejSON } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';

@Component({
  selector: 'app-state-map',
  templateUrl: './state-map.component.html',
  styleUrls: ['./state-map.component.scss']
})
export class StateMapComponent implements OnInit {
  public files_:any=[];
  private tempjson:any;
  private fileTemp_:any;
  name:string;
  Lista: itemresponsejSON[];
  form: FormGroup;

  constructor(private load:CargarScriptsService,
   private fb:FormBuilder,
   private BackendService:BackendService,
   private ngxToastService: NgxToastService) {
    this.name="";
    load.Carga(["popup"]);
    load.Carga(["statemap"]);

    this.form = this.fb.group({
      File: [this.files_],
      NAME:['']
    })

     this.Lista = [];

    const id = localStorage.getItem("id") || "-1";

   this.BackendService.getJS(
    new ID_Name_type(parseInt(id), "", 4)
   ).subscribe((X:any)=>{
    if(X.msg == "ok"){
      this.Lista = X.result;
      console.log(this.Lista);

      
    }
   });

   }

  ngOnInit(): void {
  }


  cargar(Nombre:string,datajson: string){

    this.form.value['NAME'] = Nombre;
    this.name=Nombre;

    const area = document.getElementById(`mySavedModel`) as HTMLTextAreaElement;
    area.value  = datajson;
  }

  Saved(){
    try{
      const id = localStorage.getItem("id") || "-1";
      
      this.tempjson = (document.getElementById("mySavedModel") as HTMLTextAreaElement).value;

      console.log(this.tempjson);

      if(id != "-1" && this.form.controls['NAME'].value != '' && this.tempjson != null){
      const formularioDeDatos = new FormData();
      formularioDeDatos.append('files',this.tempjson);
      formularioDeDatos.append('NAME', this.form.controls['NAME'].value);
      formularioDeDatos.append('ID', id );
      formularioDeDatos.append('TYPE_', "4" );
        console.log(this.form.controls['NAME'].value);
     //agregar un apend 
      this.BackendService.addJS(
        formularioDeDatos
      ).subscribe((res:any)=>{
        if (res.msg == "ok") {
          this.ngxToastService.onSuccess('Enviado','Se Guardo adecuadamente');
          this.name=this.form.value['NAME'];
          const id = localStorage.getItem("id") || "-1";

          this.BackendService.getJS(
           new ID_Name_type(parseInt(id), "", 4)
          ).subscribe((X:any)=>{
           if(X.msg == "ok"){
             this.Lista = X.result;
           }
          });
          
        }else{
          this.ngxToastService.onDanger('Error','No se pudo guardar los datos');
        }
      });
    }else{
      this.ngxToastService.onWarning('Fail','por favor Ingrese los datos');
    }
    }catch(e){
      console.log('ERROR',e);
    }
  }

  eliminar(NAME:string){
    const id = localStorage.getItem("id") || "-1";

    this.BackendService.dellJS(
      new ID_Name_type(parseInt(id), NAME, 4)
     ).subscribe((X:any)=>{
      if(X.msg == "ok"){
        this.form.value['NAME'] = "";
        const id = localStorage.getItem("id") || "-1";

        this.BackendService.getJS(
         new ID_Name_type(parseInt(id), "", 4)
        ).subscribe((X:any)=>{
         if(X.msg == "ok"){
           this.Lista = X.result;
         }
        });
        
        
      }
     });
  }


}
