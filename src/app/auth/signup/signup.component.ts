import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  onSignup(form:NgForm){
    if(form.valid){
      console.log(form.value['email'],form.value['password']);
      this.auth.createUser(form.value['email'],form.value['password']);
    }

  }

}
