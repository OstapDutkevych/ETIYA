import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './_components/login-page/login-page.component';
import { MainWrapperComponent } from './_components/main-wrapper/main-wrapper.component';
import { MainPageComponent} from './_components/main-wrapper/main-page/main-page.component';
import { CreateUserComponent} from './_components/main-wrapper/create-user/create-user.component';
import { UserInfoComponent} from './_components/main-wrapper/user-info/user-info.component';
import { RegisterPageComponent } from './_components/register-page/register-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: 'auth/login', component: LoginPageComponent },
  { path: 'auth/register', component: RegisterPageComponent  },
  { path: 'app', component: MainWrapperComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'main' },
      { path: 'main', component: MainPageComponent },
      { path: 'create-user', component: CreateUserComponent },
      { path: 'info-user', component: UserInfoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
