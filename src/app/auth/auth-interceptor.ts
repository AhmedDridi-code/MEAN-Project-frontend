import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const authorToken = this.authService.getToken();
        console.log("token: "+authorToken);
        const authRequest = req.clone({
            headers:req.headers.set('Authorization',"Bearer "+authorToken)
        });
        console.log(authRequest);
        return next.handle(authRequest)
    }

}