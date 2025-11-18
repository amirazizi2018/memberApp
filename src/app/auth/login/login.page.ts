import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class LoginPage {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  submitLogin() {
    console.log(this.username, this.password);
    this.authService.login(this.username, this.password).subscribe({
      next: async (res) => {
        const token = res.data.token;
        const userInfo = res.data.userInfo;

        await this.authService.saveToken(token);
        await this.authService.saveUserInfo(userInfo); // اضافه کردن این خط

        this.router.navigate(['/resolutions']);
      },
      error: () => {
        this.error = 'نام کاربری یا رمز عبور اشتباه است';
      },
    });

  }
}
