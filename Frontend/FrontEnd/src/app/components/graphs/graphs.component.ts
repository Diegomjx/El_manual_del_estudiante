import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  panelOpenState = false;

  constructor(private load:CargarScriptsService) { 
    load.Carga(["flowchart"]);

  }

  ngOnInit(): void {

  }
    

}


