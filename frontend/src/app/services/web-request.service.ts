import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WebRequestService {
  readonly ROOT_URL: string;

  constructor( private http: HttpClient ) { 
    this.ROOT_URL = "http://localhost:3000"
  }

  getRequest(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`)
  }

  postRequest(uri: string, payload: Object){
    console.log("Web Request Service and payload => ", payload)
    console.log("URL is => ",`${this.ROOT_URL}/${uri}`)
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload)

  }

  putRequest(uri: string, payload: Object){
    return this.http.put(`${this.ROOT_URL}/${uri}`, payload)
  }

  deleteRequest(uri: string){
    console.log("Web sevice")
    return this.http.delete(`${this.ROOT_URL}/${uri}`)
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/signup`, {
      email,
      password
    })
  }

  signin( email:string, password: string){
    return this.http.post(`${this.ROOT_URL}/signin`, {
      email,
      password
    })
  }
}
