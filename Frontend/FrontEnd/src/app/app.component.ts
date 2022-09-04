import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrontEnd';
  panelOpenState = false;
  showAlert = false;

  constructor(private router:Router, private alertServive: AlertService ) { }


  login(){
    this.router.navigateByUrl('/login');
  }

  upload(){
    this.router.navigateByUrl('/upload')
  }

  textEditor(){
    this.router.navigateByUrl('/textEditor')
  }

  ngOnInit(){
    this.alertServive.alert$.subscribe((res) => (this.showAlert =true) )
  }
  
}




