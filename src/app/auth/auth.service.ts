import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { STORAGE } from '../../app/app.config';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private tokenKey = 'auth-token';

    constructor(private http: HttpClient, @Inject(STORAGE) private storage: Storage, private router: Router) {
        this.storage.create();
    }

    login(username: string, password: string) {
        return this.http.post<{ token: string }>('https://your-api.com/v1/auth/login', {
            username,
            password,
        });
    }

    async saveToken(token: string) {
        await this.storage.set(this.tokenKey, token);
    }

    async getToken(): Promise<string | null> {
        return await this.storage.get(this.tokenKey);
    }

    async isLoggedIn(): Promise<boolean> {
        const token = await this.getToken();
        return !!token;
    }

    async logout() {
        await this.storage.remove(this.tokenKey);
        this.router.navigate(['/login']);
    }
}
