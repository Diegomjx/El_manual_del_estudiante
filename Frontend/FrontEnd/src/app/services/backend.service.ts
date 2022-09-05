import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { addPDF, addUser, ApuntesList, IDItem, LoginUser, response, userList } from '../models/models';


const BE_API = environment.urlBackend;
const httpOptions = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

 getUser(USUARIO: string, CONTRASEÑA: string){
  
  let url: string = BE_API+"/UserLogin";
  let Content: LoginUser = new LoginUser(USUARIO, CONTRASEÑA);
  console.log(Content);
  return this.http.post<userList>(url,Content, httpOptions);
 }

 addUser(USUARIO: string, CONTRASEÑA: string, NOMBRE: string, CORREO: string){
  
  let url: string = BE_API+"/User";
  let Content: addUser = new addUser(USUARIO,CONTRASEÑA,NOMBRE,CORREO);
  console.log(Content);
  return this.http.post<response>(url,Content, httpOptions);
 }

 addPDF(body:FormData){
  let url: string = BE_API+"/PDF";
  console.log(body);
  return this.http.post<response>(url,body);
 }

 getPDFs(){
  let url: string = BE_API + "/Apuntes";
  return this.http.get<ApuntesList>(url,httpOptions);
 }

 getPDFID(ID: number){
  let url: string = BE_API + "/Apuntes/User";
  let Content: IDItem = new IDItem(ID); 
  return this.http.post<ApuntesList>(url,Content,httpOptions);
 }

}
