import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard, isAuthenticated } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {
        path: "login", component: LoginComponent, canActivate: [isAuthenticated]
    },
    {
        path: "signup", component: SignUpComponent, canActivate: [isAuthenticated]
    },
    {
        path: "dashboard", component: DashboardComponent, canActivate: [authGuard]
    },
    {
        path: "profile", component: ProfileComponent, canActivate: [authGuard]
    },
    {
        path: "**", component: LoginComponent, canActivate: [isAuthenticated]
    }

];
