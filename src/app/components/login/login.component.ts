
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  
  loginForm:FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['admin']);
    }
  }
  constructor(private auth:AuthService,private router:Router){

  }
  
  onSubmit(){
    console.log('value',this.loginForm.value);
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe((response)=>{
        if(response){
          this.router.navigate(['admin']);
        }
      },
      (err:Error)=>{
        alert(err.message);
      })
    }
  }
}
