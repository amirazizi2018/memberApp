import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ResolutionService } from '../resolution.service';
import { Resolution } from '../resolution.model';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-resolution-list',
    standalone: true,
    imports: [CommonModule, IonicModule, FormsModule],
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ResolutionListPage implements OnInit {
    private resolutionService = inject(ResolutionService);
    private authService = inject(AuthService);
    private toastCtrl = inject(ToastController);

    userFullName = '';
    resolutions: Resolution[] = [];

    async ngOnInit() {
        await this.loadResolutions();
        const user = await this.authService.getUserInfo();
        this.userFullName = `${user?.firstName} ${user?.lastName}` || '';
    }

    async loadResolutions() {
        try {
            this.resolutions = await this.resolutionService.getUserResolutions();

            console.log(this.resolutions);
        } catch (err: any) {
            const errorMessage =
                err?.error?.message ||
                (Array.isArray(err?.error?.errors) ? err.error.errors[0] : 'خطای ناشناخته‌ای رخ داده است');

            this.showToast(errorMessage, 'danger');
        }
    }

    async updateProgress(res: Resolution) {
        try {
            await this.resolutionService.updateProgress(res.id, res.progressPercent);
            this.showToast('درصد پیشرفت با موفقیت ذخیره شد', 'success');
        } catch (err: any) {
            const errorMessage =
                err?.error?.message ||
                (Array.isArray(err?.error?.errors) ? err.error.errors[0] : 'خطای ناشناخته‌ای رخ داده است');

            this.showToast(errorMessage, 'danger');
        }

    }


    async showToast(message: string, color: 'primary' | 'success' | 'warning' | 'danger' = 'primary', duration = 2000) {
        const toast = await this.toastCtrl.create({
            message,
            duration,
            color,
        });
        toast.present();
    }


    logout() {
        this.authService.logout();
    }
}
