import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {

  constructor(private load:CargarScriptsService) { 
    load.Carga(["draw"]);
    load.Carga(["FreehandDrawingTool"]);
    load.Carga(["GeometryReshapingTool"]);
  }

  ngOnInit(): void {
  }

}
