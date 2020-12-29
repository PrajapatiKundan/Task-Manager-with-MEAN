import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webRequestService: WebRequestService, private router: Router) { }

  signup(email: string, password: string){
    return this.webRequestService.signup(email, password).pipe(
      shareReplay(),
      tap( (res: HttpResponse<any>) => {
        console.log("TAP works")
      })
    )
  }

  signin( email: string, password: string) {
    return this.webRequestService.signin(email, password).pipe(
      shareReplay(),
      tap( (res: HttpResponse<any>) => {
        console.log("Tap SignIn")
      })
    )
  }

  signOut() {
    localStorage.removeItem("token")
    this.router.navigate(['/signin'])
  }
}
