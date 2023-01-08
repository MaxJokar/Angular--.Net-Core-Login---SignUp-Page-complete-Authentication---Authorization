import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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




  constructor(private fb:FormBuilder, private auth: AuthService) {}

  ngOnInit(): void{
    this.signUpForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      usertName: ['',Validators.required],
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
          alert(res.message)
        })
        ,error:(err=>{
          alert(err?.error.message)
        })
      })

      console.log(this.signUpForm.value)
    }else{
      this.validateAllFormFileds(this.signUpForm)
      //logic for throwing error
    }
  }
  private validateAllFormFileds(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl) {
        control.markAsDirty( {onlySelf: true });
      } else if(control instanceof FormGroup) {
        this.validateAllFormFileds(control)
      }

    })

  }



}
