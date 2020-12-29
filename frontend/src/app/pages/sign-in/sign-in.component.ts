import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  clickOnSignIn(email: string, password: string) {
    this.authService.signin( email, password ).subscribe(
      (res: any) => {
        localStorage.setItem("token", res.token)
        if(res.token) {
          this.router.navigate(['/lists'])
        }
      },
      (error) => {
        alert(error.error.err)
      }
    )
  }
}
