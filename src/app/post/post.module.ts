import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../components/post/post.component';
import { PostListComponent } from '../components/post-list/post-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    PostComponent,
    PostListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    AppRoutingModule,
  ]
})
export class PostModule { }
