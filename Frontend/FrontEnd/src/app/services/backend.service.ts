import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const BE_API = environment.urlBackend;
const HTTP_OPTIONS = {Headers: new HttpHeaders().set('Content-Type','application/json')};

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private HTTPClient:HttpClient) { }

 registerUser(){

  }
}
