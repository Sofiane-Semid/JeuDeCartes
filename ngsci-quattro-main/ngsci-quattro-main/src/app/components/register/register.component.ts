import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('passwordConfirm')?.value;

  
  if (!password || !confirm) {
    return null;
  }

  return password === confirm ? null : { passwordMismatch: true };
}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formGroup: FormGroup;
  username: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';
  errorMessage: string = ''

  constructor(public apiService: ApiService, public router: Router, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirm: ['', [Validators.required]],
      },
      {
        validators: passwordMatchValidator
      }
    );
  }
  async register(): Promise<void> {
   
      if (this.formGroup.invalid) {
  this.formGroup.markAllAsTouched(); 
  return;
}


       const { username, email, password, passwordConfirm } = this.formGroup.value;
      try {
      await this.apiService.register(username, email, password, passwordConfirm);
      await this.apiService.login(username, password);
      this.router.navigate(['/']);
    } catch (err: any) {
  console.error(err);

  const message =
    err?.error?.Error || 
    err?.error?.errorMessage || 
    "Nom d'utilisateur invalide";

  this.formGroup.get('username')?.setErrors({
    serverError: message
  });
}
  }


}


