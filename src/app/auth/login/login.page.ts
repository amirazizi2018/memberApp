import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs'

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, IonicModule, FormsModule],
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {
    private authService = inject(AuthService);
    private router = inject(Router);

    username = '';
    password = '';
    error = '';

    async submitLogin() {
        try {
            const res = await firstValueFrom(this.authService.login(this.username, this.password))
            const token = res.data.token;
            const userInfo = res.data.userInfo;

            await this.authService.saveToken(token);
            await this.authService.saveUserInfo(userInfo);

            this.router.navigate(['/resolutions']);
        } catch (err: any) {
            this.error =
                err?.error?.message ||
                (Array.isArray(err?.error?.errors) ? err.error.errors[0] : 'خطا در ورود به حساب');
        }
    }
}
