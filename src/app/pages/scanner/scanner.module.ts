import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerPageRoutingModule } from './scanner-routing.module';

import { ScannerPage } from './scanner.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [ScannerPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ScannerPageRoutingModule,
        SharedModule
    ]
})
export class ScannerPageModule {}
