import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  {path:'',component: PostListComponent},
  {path:'create',component: PostComponent,canActivate: [AuthGuard]},
  {path:'edit/:id',component: PostComponent,canActivate: [AuthGuard]},
  {path:"",loadChildren: () => import('./auth/auth-routing/auth-routing.module').then(m => m.AuthRoutingModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
