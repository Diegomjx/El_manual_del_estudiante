import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  constructor(private load:CargarScriptsService) { 
    load.Carga(["records"]);
  
   }

  ngOnInit(): void {
  }

}
