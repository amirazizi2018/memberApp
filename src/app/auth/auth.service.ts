import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { STORAGE } from '../app.config';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private tokenKey = 'auth-token';
    private userKey = 'user-info';


    constructor(private http: HttpClient, @Inject(STORAGE) private storage: Storage, private router: Router) {
        this.storage.create();
    }

    login(username: string, password: string) {
        return this.http.post<{
            message: string;
            data: {
                token: string;
                userInfo: {
                    id: string;
                    firstName: string;
                    lastName: string;
                    email: string;
                    role: string;
                };
            };
        }>('http://localhost:5258/api/auth/login', {
            email: username,
            password,
            role:"member"
        });
    }

    async saveToken(token: string) {
        await this.storage.set(this.tokenKey, token);
    }

    async getToken(): Promise<string | null> {
        return await this.storage.get(this.tokenKey);
    }

    async saveUserInfo(userInfo: any) {
        await this.storage.set(this.userKey, userInfo);
    }

    async getUserInfo(): Promise<any> {
        return await this.storage.get(this.userKey);
    }


    async isLoggedIn(): Promise<boolean> {
        const token = await this.getToken();
        return !!token;
    }

    async logout() {
        await this.storage.remove(this.tokenKey);
        await this.storage.remove(this.userKey);
        this.router.navigate(['/login']);
    }

}
