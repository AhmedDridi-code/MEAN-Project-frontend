import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from '../models/auth-data';
import {environment} from "../../environments/environment"
const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token?: string;
  isAuthenticated?: boolean;
  private userId:string="";

  constructor(private http:HttpClient,private router:Router) { }
  getUserId(){
    return this.userId;
  }

  getToken(){ return this.token; }  
  private authStatusListener = new Subject<boolean>();
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  createUser(email: string, password: string){
    
    const authData = new AuthData(email,password);
    console.log(authData);
    this.http.post(BACKEND_URL+"/user/signup",authData).subscribe(response => {
      console.log(response);
    })
  }

  login(email: string, password: string){
    const authData = new AuthData(email,password);
    this.http.post<{token:string,expiresIn:number,userId:string}>(BACKEND_URL+"/user/login",authData).subscribe(response => {
      console.log(response);
      this.token=response.token;
      if(this.token){
        this.setAuthTimer(response.expiresIn)
        this.isAuthenticated=true;
        this.userId=response.userId;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + response.expiresIn * 1000);
        this.saveAuthData(this.token,expirationDate)
        this.authStatusListener.next(true);
        this.router.navigate(["/"]);
      }

    })
  }

  logout(){
    this.token="";
    this.isAuthenticated=false;
    this.authStatusListener.next(false)
    this.userId="";
    this.clearAuthData()
    this.router.navigate(["/"]);
  }

  setAuthTimer(expiresIn:number){
    setTimeout(() =>{
      this.logout();

    },expiresIn*1000);
  }
  autoAuthUser(){
    const authData = this.getAuthData();
    if(!authData){
      return;
    }
    const now = new Date();
    const expiresIn= authData.expirationDate.getTime()- now.getTime();
    if(expiresIn>0){
      this.token=authData.token;
      this.userId=authData.userId || "";
      this.isAuthenticated=true;
      this.setAuthTimer(expiresIn/1000)
      this.authStatusListener.next(true);
    }
  }

  private saveAuthData(token:string, expirationDate:Date){
    localStorage.setItem("token",token);
    localStorage.setItem("expiration",expirationDate.toISOString());
    localStorage.setItem("userId",this.userId);
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("expiration"))
  }
  

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration")
    localStorage.removeItem("userId");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration")
    const userId = localStorage.getItem("userId");
    if(!token || !expirationDate) return;
    return {token:token, expirationDate:new Date(expirationDate), userId:userId}
  }
  
}
