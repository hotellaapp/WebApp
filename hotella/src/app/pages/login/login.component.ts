import {Component,OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { Http } from '@angular/http';
import {  ViewChild, ElementRef } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})

export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  sub: any;
  errorMessage: string = '';
  @ViewChild('loginErrado') loginErrado: ElementRef;

  constructor(fb:FormBuilder,  private router: Router, private authService: AuthService,private route: ActivatedRoute) {
    
    this.form = fb.group({
      'email': [''],
      'password': ['']
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }



  public onSubmit(values:Object):void {
    this.submitted = true;
    
    if (this.form.valid) {
     /* this.authService.isUserAuthenticated(this.form.value['email'], this.form.value['password']).subscribe(
        authenticated => {
            if(authenticated) {
              this.router.navigateByUrl('pages/dashboard');					  
          } else {
            this.loginErrado.nativeElement.click();
          }
        }

      );*/
      this.router.navigateByUrl('pages/dashboard');	
    }

    }

  }
  

