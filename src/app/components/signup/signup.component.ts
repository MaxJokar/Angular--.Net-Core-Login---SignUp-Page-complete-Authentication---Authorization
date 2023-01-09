import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  router: any;




  constructor(private fb:FormBuilder, private auth: AuthService) {}

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
      //perform logic for signup
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.signUpForm.reset();
          //this.router.navigate(['login']);
        })
        ,error:(err=>{
          alert(err?.error.message)
        }) // check
      })

      console.log(this.signUpForm.value)
    }else{
      ValidateForm.ValidateAllFormFields(this.signUpForm)
      //logic for throwing error
    }
  }

}





