import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  name:string;
  private eviarnombreSubject = new Subject<string>();
  enviarnombreobservable = this.eviarnombreSubject.asObservable();
  constructor() {
    this.name = 'USER';
   }

  enviarnombre(nombre:string){
    this.name = nombre;
    this.eviarnombreSubject.next(this.name);
  }
}
