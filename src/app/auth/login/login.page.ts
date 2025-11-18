import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class LoginPage {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  submitLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: async (res) => {
        await this.authService.saveToken(res.token);
        this.router.navigate(['/resolutions']);
      },
      error: () => {
        this.error = 'نام کاربری یا رمز عبور اشتباه است';
      },
    });
  }
}
