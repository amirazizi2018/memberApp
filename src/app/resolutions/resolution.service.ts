import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resolution } from './resolution.model';

@Injectable({
    providedIn: 'root',
})
export class ResolutionService {
    private baseUrl = 'http://localhost:5258/api/resolutions';

    constructor(private http: HttpClient) {}

    getUserResolutions(): Observable<Resolution[]> {
        return this.http.get<Resolution[]>(this.baseUrl);
    }

    updateProgress(id: string, progress: number): Observable<any> {
        return this.http.put(`${this.baseUrl}/${id}/progress`, { progress });
    }
}
