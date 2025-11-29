import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
    imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, NgIf],

})
export class LoginComponent  implements OnInit {

  loginFormulaire: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.loginFormulaire = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    const username = this.loginFormulaire.get('username')?.value;
    const password = this.loginFormulaire.get('password')?.value;
    this.authService.login({username, password}).subscribe(
      {
        next: (res) => {
          if(this.authService.isAuthenticated()) {
            if(this.authService.hasRole('ROLE_ATTACHE')){
              this.router.navigate(['/absences']);
            }
          }
        },
        error: (err) => {
          console.error('Login error:', err);
        }
      }
    );

  }

}
