import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';

declare function init() :void;
@Component({
  selector: 'app-electronica',
  templateUrl: './electronica.component.html',
  styleUrls: ['./electronica.component.scss'],
  
})
export class ElectronicaComponent implements OnInit {

  constructor(
   private load:CargarScriptsService
  ) { 
    load.Carga(["Electronica"]);




    
  }

  ngOnInit(): void {

  }

  

}
