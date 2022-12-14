import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { addUser, adminPeticion, ApuntesList, IDandID_ListItem, IDandID_PDFItem, IDItem, IDSeguidorandIDSiguiendo, ID_LISTAandID_PDFItem,  ID_LISTAiTEM,  ID_Name_type,  ID_PDFItem,  ListItem,  ListItemsend, ListList, LIstofListwhithPDF, LoginUser, response,  responseJSON,  responseSeguir,  siguiendo,  UpdateApuntesItem,  userList, USUARIOID } from '../models/models';


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

 dellPDF(body:number){
  let url  : string = BE_API+"/Apuntes/"+body;
  return  this.http.delete<response>(url, httpOptions);
 }

 addList(body:ListItemsend){
  let url: string = BE_API+"/List";
  return this.http.post<response>(url, body, httpOptions);
 }

 getLists(body:IDItem){
  let url: string = BE_API+"/List/ID";
  return this.http.post<ListList>(url, body, httpOptions);
 }

 getPDFs(body: IDItem){
  let url: string = BE_API + "/Apuntes";
  return this.http.post<ApuntesList>(url,body,httpOptions);
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

 getPDFinList(body:IDandID_ListItem){
  let url: string = BE_API+ "/List/getPDF";
  return this.http.post<ApuntesList>(url, body, httpOptions);
 }

 addPDFenHistorial(body:IDandID_PDFItem){
  let url: string = BE_API+ "/Historial/add";
  return this.http.post<response>(url, body, httpOptions);
 }

 getPDFenHistorial(body:IDItem){
  let url: string = BE_API+ "/Historial/get";
  return this.http.post<ApuntesList>(url, body, httpOptions);
 }

 addMegusta(body:IDandID_PDFItem){
  let url: string = BE_API +"/Megusta/add";
  return this.http.post<response>(url, body, httpOptions);
 }

 getMegusta(body:IDItem){
  let url: string = BE_API +"/Megusta/get";
  return this.http.post<ApuntesList>(url, body, httpOptions);
 }

 dellMegusta(body:IDandID_PDFItem){
  let url: string = BE_API +"/Megusta/dell";
  return this.http.post<response>(url, body, httpOptions);
 }

 Find(body:string, ID:number){
  let url: string = BE_API+"/Serch";
  let content: IDItem = new IDItem(ID);
  return this.http.post<ApuntesList>(url+'/'+body,content,httpOptions);
 }

 UpdatePDFByIDPDF(body:UpdateApuntesItem){
  let url: string = BE_API+"/Apuntes/Update";
  return this.http.post<response>(url, body, httpOptions);
 }
//*******para seguir****** */
 getinfotothePDF(body:IDandID_PDFItem){
  let url: string = BE_API +"/Apuntes/info";
  return this.http.post<responseSeguir>(url, body, httpOptions);
 }

 addSeguidor(body:IDSeguidorandIDSiguiendo){
  let url: string = BE_API +"/Seguidor/add";
  return this.http.post<response>(url, body, httpOptions);
 }

 dellSeguidor(body:IDSeguidorandIDSiguiendo){
  let url: string = BE_API +"/Seguidor/dell";
  return this.http.post<response>(url, body, httpOptions);
 }

 getSeguiendo(body:IDItem){
  let url: string = BE_API +"/Seguidor/get";
  return this.http.post<siguiendo>(url, body, httpOptions);
 }

 getSiguiendowhithUSER(body:USUARIOID){
  let url: string= BE_API+"/Seguidor/USUARIO/get";
  return this.http.post<responseSeguir>(url, body, httpOptions);
 }

 getApuntesRevisedorNot(body:adminPeticion){
  let url: string = BE_API+'/Admin/getApuntesRevised';
  return this.http.post<ApuntesList>(url, body, httpOptions);
 }

 getApuntesInvitado(body:USUARIOID){
  let url: string = BE_API+'/Apuntes/invitado';
  return this.http.post<ApuntesList>(url, body, httpOptions);
 }

 Aprube(body:ID_PDFItem){
  let url: string = BE_API +"/Admin/Appunte/Aprube";
  return this.http.post<response>(url, body, httpOptions);
 }

 disapproved(body:ID_PDFItem){
  let url: string = BE_API +"/Admin/Appunte/disapproved";
  return this.http.post<response>(url, body, httpOptions);
 }

 dellList(body:ID_LISTAiTEM){
  let url: string = BE_API+"/List/Dell";
  return this.http.post<response>(url,body, httpOptions);
 }

 updateList(body:ListItem){
  let url: string = BE_API+"/List/Update";
  return this.http.post<response>(url,body,httpOptions);
 }

 addJS(body:FormData){
  let url: string = BE_API+"/JS";
  console.log(body);
  return this.http.post<response>(url,body);
 }
 dellJS(body:ID_Name_type){
  let url: string = BE_API+"/JS/dell";
  console.log(body);
  return this.http.post<response>(url,body,httpOptions);
 }

 getJS(body:ID_Name_type){
  let url: string = BE_API+"/JS/get";
  return this.http.post<responseJSON>(url,body,httpOptions);
 }








}
