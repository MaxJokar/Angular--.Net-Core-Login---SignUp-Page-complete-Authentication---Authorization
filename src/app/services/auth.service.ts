import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // need a Url to reach API : The following is url address of our Swagger
  private baseUrl:string ="https://localhost:7192/api/User/";

 // to do API make  call we inject
  constructor(private http : HttpClient) { } // To do API calling


  // Following methods were able to pass objects to the back
  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }


  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }

}
