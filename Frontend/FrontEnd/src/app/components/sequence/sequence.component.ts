import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.scss']
})
export class SequenceComponent implements OnInit {

  constructor(private load:CargarScriptsService) { 
    load.Carga(["sequence"]);
 }

  ngOnInit(): void {
  }

}
