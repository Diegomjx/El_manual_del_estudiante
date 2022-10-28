import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';

@Component({
  selector: 'app-state-map',
  templateUrl: './state-map.component.html',
  styleUrls: ['./state-map.component.scss']
})
export class StateMapComponent implements OnInit {

  constructor(private load:CargarScriptsService) {
    load.Carga(["statemap"]);

   }

  ngOnInit(): void {
  }

}
