import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  type: string ="password"
  isText:boolean = false ;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;




  // injec AuthService to do API call
  constructor(private fb:FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void{
    this.signUpForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
    })

  }

  hideShowPass(){
    this.isText = !this.isText ; // to change eye mode from visible to unvisible
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash" ;
    this.isText ? this.type = "text" : this.type = "password" ;

  }

  onSignup() {
    if(this.signUpForm.valid) {
      // Call the method ,send object signUpForm
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          // if its success it gives alert then reset the form
          alert(res.message);
          this.signUpForm.reset();
          // if the sign up is success we can login & show on Dashboard Component
          // we are sending to the login page
          this.router.navigate(['login']);
        })
        ,error:(err=>{
          alert(err?.error.message)
        })
      })
      //After we signed up twice ,got error , was ok but this line not necessary
      //console.log(this.signUpForm.value)
    }else{
      ValidateForm.ValidateAllFormFields(this.signUpForm)
      //logic for throwing error
    }
  }

}





