import { Component, OnInit } from '@angular/core';

declare function init() :void;
@Component({
  selector: 'app-electronica',
  templateUrl: './electronica.component.html',
  styleUrls: ['./electronica.component.scss'],
  
})
export class ElectronicaComponent implements OnInit {
  GO: HTMLScriptElement;
  FIGURES: HTMLScriptElement;
  Electronica: HTMLScriptElement;
  constructor() { 


    this.Electronica = document.createElement("script");
    this.Electronica.src="../../../assets/Electronica.js";


    document.body.appendChild(this.Electronica);
    //             "src/assets/Electronica.js"
    
   // init();
    
  }

  ngOnInit(): void {
  }

  

}
