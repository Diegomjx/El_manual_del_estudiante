import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';

@Component({
  selector: 'app-mindmap',
  templateUrl: './mindmap.component.html',
  styleUrls: ['./mindmap.component.scss']
})
export class MindmapComponent implements OnInit {

  constructor(private load:CargarScriptsService) { 
    load.Carga(["mindmap"]);
  }


  ngOnInit(): void {
  }

}
