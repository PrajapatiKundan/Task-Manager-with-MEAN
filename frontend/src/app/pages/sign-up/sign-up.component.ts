import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  clickOnSignUp(email: string, password: string, cpassword: string){
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(email)){
      alert("Please enter valid email")
      return
    }    

    if(password.length < 6){
      alert("Password have atleat 6 characters")
      return
    }
    if(password !== cpassword){
      alert("Passwords must be same")
      return
    }
    
    this.authService.signup(email, password).subscribe(
      (res: any) => {
        localStorage.setItem("token", res.token)
        if( res.token ){
          this.router.navigate(['/lists'])
        }
      },
      (error) => {
        alert(error.error.err)
      }
    )
  }
}
