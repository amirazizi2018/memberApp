import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { STORAGE } from '../app.config';
import { UserInfo } from '../core/models/user-info.model'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private storage = inject(STORAGE);
    private router = inject(Router);

    private tokenKey = 'auth-token';
    private userKey = 'user-info';

    constructor() {
        this.storage.create();
    }

    login(username: string, password: string) {
        return this.http.post<{
            message: string;
            data: {
                token: string;
                userInfo: UserInfo;
            };
        }>('http://localhost:5258/api/auth/login', {
            email: username,
            password,
            role: 'member',
        });
    }

    async saveToken(token: string): Promise<void> {
        await this.storage.set(this.tokenKey, token);
    }

    async getToken(): Promise<string | null> {
        return await this.storage.get(this.tokenKey);
    }

    async saveUserInfo(userInfo: UserInfo): Promise<void> {
        await this.storage.set(this.userKey, userInfo);
    }

    async getUserInfo(): Promise<UserInfo | null> {
        return await this.storage.get(this.userKey);
    }

    async isLoggedIn(): Promise<boolean> {
        const token = await this.getToken();
        return !!token;
    }

    async logout(): Promise<void> {
        await this.storage.remove(this.tokenKey);
        await this.storage.remove(this.userKey);
        this.router.navigate(['/login']);
    }
}
