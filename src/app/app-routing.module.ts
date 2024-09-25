import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const routes: Routes = [
    {
        path:'login',component:LoginComponent,
    },
    {
        path:'forget-password',component:ForgotPasswordComponent
    },
    {
        path:'admin',loadChildren:()=>import('./modules/admin/admin.module').
        then((m)=>m.AdminModule)
    },
    {
        path:'',redirectTo:'/login',pathMatch:'full'
    },
    {
        path:'**',component:NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}