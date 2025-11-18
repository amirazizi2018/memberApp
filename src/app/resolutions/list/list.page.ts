import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ResolutionService } from '../resolution.service';
import { Resolution } from '../resolution.model';
import { AuthService } from '../../auth/auth.service'

import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';

@Component({
    selector: 'app-resolution-list',
    standalone: true,
    imports: [ CommonModule, IonicModule, FormsModule ],
    templateUrl: './list.page.html',
    styleUrls: [ './list.page.scss' ],
})
export class ResolutionListPage implements OnInit {
    userFullName: string = '';
    resolutions: Resolution[] = [];

    constructor(
        private resolutionService: ResolutionService,
        private authService: AuthService,
        private toastCtrl: ToastController
    ) {
        addIcons({ logOutOutline });
    }

    async ngOnInit() {
        this.loadResolutions();
        const user = await this.authService.getUserInfo();
        this.userFullName = `${user?.firstName} ${user?.lastName}` || '';

    }

    loadResolutions() {
        this.resolutionService.getUserResolutions().subscribe({
            next: (data) => (this.resolutions = data),
            error: () => this.showToast('خطا در دریافت مصوبات'),
        });
    }

    updateProgress(res: Resolution) {
        this.resolutionService.updateProgress(res.id, res.progress).subscribe({
            next: () => this.showToast('درصد پیشرفت با موفقیت ذخیره شد'),
            error: () => this.showToast('خطا در ذخیره‌سازی'),
        });
    }

    async showToast(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 2000,
            color: 'primary',
        });
        toast.present();
    }

    logout() {
        this.authService.logout();
    }

}
