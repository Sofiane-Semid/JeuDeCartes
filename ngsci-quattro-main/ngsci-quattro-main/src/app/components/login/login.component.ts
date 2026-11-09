import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { HubConnection } from '@microsoft/signalr';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginUsername: string = '';
  loginPassword: string = '';
  errorMessage: string = '';
  formGroup: FormGroup;


  constructor(
    public apiService: ApiService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login(): Promise<void> {
    if (this.formGroup.invalid) {
      return;
    }
    const { username, password } = this.formGroup.value;
    try {
      await this.apiService.login(username, password);
      this.router.navigate(['/home']);
      localStorage.setItem('username', this.loginUsername);
    }
    catch (err: any) {
      console.error(err);
      this.errorMessage = err?.error?.errorMessage || "Nom d'utilisateur ou mot de passe invalide";
    }

  }
  Register(): void {
    this.router.navigate(['/register']);
  }

  
}
