import { Injectable } from '@angular/core';
import {Subject,BehaviorSubject} from 'rxjs';
import { ApuntesItem } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  name:string;
  private eviarnombreSubject = new Subject<string>();
  enviarnombreobservable = this.eviarnombreSubject.asObservable();
  
  APUNTESource = new  BehaviorSubject<ApuntesItem>(new ApuntesItem(0,0,'',''));
  currentAPUNTE = this.APUNTESource.asObservable();

  constructor() {
    this.name = 'USER';
   }

  enviarnombre(nombre:string){
    this.name = nombre;
    this.eviarnombreSubject.next(this.name);
  }

  showNotes(APUNTE:ApuntesItem){
    this.APUNTESource.next(APUNTE);
  }

}
