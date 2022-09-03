import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrontEnd';
  panelOpenState = false;
  showAlert = false;

  constructor(private router:Router ) { }


  login(){
    this.router.navigateByUrl('/login');
  }

  upload(){
    this.router.navigateByUrl('/upload')
  }

  
}




