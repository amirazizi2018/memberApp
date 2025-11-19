import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Resolution } from './resolution.model';
import { AuthService } from '../auth/auth.service'

@Injectable({
    providedIn: 'root',
})
export class ResolutionService {
    private baseUrl = 'http://localhost:5258/api/resolution';
    private http = inject(HttpClient);
    private authService = inject(AuthService);


    async getUserResolutions(): Promise<Resolution[]> {
        const token = await this.authService.getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const request$: Observable<{ data: Resolution[] }> =
            this.http.get<{ data: Resolution[] }>(`${this.baseUrl}/user`, { headers });

        const response = await firstValueFrom(request$);
        return response.data;
    }




    async updateProgress(id: string, progressPercent: number): Promise<any> {
        const token = await this.authService.getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return firstValueFrom(
            this.http.put(`${this.baseUrl}/${id}/progress`, { progressPercent }, { headers })
        );
    }

}
