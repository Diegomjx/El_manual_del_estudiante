import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { addPDF, addUser, ApuntesList, IDandID_PDFItem, IDItem, ID_LISTAandID_PDFItem, ID_LISTAiTEM, ListItem, ListItemsend, ListList, LIstofListwhithPDF, LoginUser, response, userList } from '../models/models';


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

 addList(body:ListItemsend){
  let url: string = BE_API+"/List";
  return this.http.post<response>(url, body, httpOptions);
 }

 getLists(body:IDItem){
  let url: string = BE_API+"/List/ID";
  return this.http.post<ListList>(url, body, httpOptions);
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

 getPDFNameAndassociativList(body:IDandID_PDFItem){
  let url: string = BE_API+ "/List/IDPDF";
  return this.http.post<LIstofListwhithPDF>(url, body, httpOptions);
 }

 addPDFinList(body:ID_LISTAandID_PDFItem){
  let url: string = BE_API+ "/List/addPDF";
  return this.http.post<response>(url, body, httpOptions);
 }

 dellPDFinList(body:ID_LISTAandID_PDFItem){
  let url: string = BE_API+ "/List/DELLPDF";
  return this.http.post<response>(url, body, httpOptions);
 }

 getPDFinList(body:ID_LISTAiTEM){
  let url: string = BE_API+ "/List/getPDF";
  return this.http.post<ApuntesList>(url, body, httpOptions);
 }





}
