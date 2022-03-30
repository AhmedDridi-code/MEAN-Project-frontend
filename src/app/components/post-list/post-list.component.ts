import { Component, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
 posts?: Post[];
 private postsSub?:Subscription;
 authSub?:Subscription;
 userIsAuthenticated=false;
isLoading: boolean = true;
limit=2;
page=1;
totalPosts=0;
pageSizeOptions=[1,2,3,5,10];
userId:string=""
  constructor(public postService:PostService, public authService:AuthService) { }

  ngOnInit(): void {
    this.postService.getPosts(this.page, this.limit);
    this.userId=this.authService.getUserId();
    this.postsSub=this.postService.getPostUpdateListener().subscribe( (postData:{posts:Post[], postCount:number}) => {
      this.posts=postData.posts;
      this.totalPosts=postData.postCount;
      this.isLoading=false;
    });
    this.userIsAuthenticated=this.authService.isAuthenticated || false;
    this.authSub=this.authService.getAuthStatusListener().subscribe(authStatus =>{
      this.userIsAuthenticated=authStatus;
    })
    
  }
  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
    this.authSub?.unsubscribe();
  }
  DeletePost(id:string){
    this.isLoading= true;
    this.postService.deletePost(id).subscribe(()=>{
      this.postService.getPosts(this.page,this.limit);
    })
  }
  onChangePage(pageData:PageEvent){
    this.isLoading= true;
    this.page=pageData.pageIndex+1;
    this.limit=pageData.pageSize;
    console.log(pageData);
    this.postService.getPosts(this.page,this.limit);
  }

}
