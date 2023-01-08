import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // need a Url to reach API
  private baseUrl:string ="https://localhost:7192/api/User/register";

 // to do API make  call we inject
  constructor(private http : HttpClient) { }


  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }


  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }

}
