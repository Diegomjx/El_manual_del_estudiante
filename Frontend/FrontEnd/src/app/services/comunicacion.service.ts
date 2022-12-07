import { Injectable } from '@angular/core';
import {Subject,BehaviorSubject} from 'rxjs';
import { ApuntesItem, ListItem } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  name:string;

  private eviarnombreSubject = new Subject<string>();
  private RolSubject = new Subject<string>();
  enviarnombreobservable = this.eviarnombreSubject.asObservable();
  Rolobservable = this.RolSubject.asObservable();
  


  ListSource = new BehaviorSubject<ListItem>(new ListItem(0,'',0));
  currentList = this.ListSource.asObservable();

  constructor() {
    this.name = 'Registrate o Logueate';
   }

  enviarnombre(nombre:string){
    this.name = nombre;
    this.eviarnombreSubject.next(this.name);
    this.RolSubject.next(localStorage.getItem('Rol')||"");
  }



  showList(List:ListItem){
    this.ListSource.next(List);
  }


  



}
