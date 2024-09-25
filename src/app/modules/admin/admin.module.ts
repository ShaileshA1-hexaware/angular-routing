import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AdminDashboardComponent,HeaderComponent,FooterComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class AdminModule { }
