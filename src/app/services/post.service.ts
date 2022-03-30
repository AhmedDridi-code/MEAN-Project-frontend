import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment"
import { Router } from '@angular/router';
const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts:Post[]=[];
  private postsUpdated = new Subject<{posts:Post[],postCount:number}>();



  constructor(private http:HttpClient, private router:Router) { }



  getPosts(page:number,limit:number) {
    const query = `?page=${page}&limit=${limit}`;
  this.http.get<{message:string,posts:any[],postCount:number}>(BACKEND_URL+'/posts'+query)
  .subscribe((data) => {
   this.posts=data.posts.map((post) => {
     return {
        id : post._id,
       title: post.title,
       description : post.description,
       imagePath : post.imagePath,
       creator:post.creator
     }
   });
   this.postsUpdated.next({posts:[...this.posts],postCount:data.postCount});
  });
  }

  getPost(id:string){
    return this.posts.find((p)=> p.id == id);
  }
  getPostUpdateListener(){ 
    return this.postsUpdated.asObservable();
  }
  addPost(post:any){
    const postData = new FormData();
    postData.append("title",post.title);
    postData.append("description",post.description);
    postData.append("image",post.image);
  this.http.post<{message:string,post:any}>(BACKEND_URL+'/posts',postData).subscribe((data) => {
    this.router.navigate(["/"]);
  });
  }
  deletePost(id:string){
    return this.http.delete(BACKEND_URL+'/posts/'+id);
  }
  updatedPost(post:any){
    console.log("post form: ")   
    console.log(post) 
    let postData;
    if(post.image){
      postData = new FormData();
      postData.append("title",post.title);
      postData.append("description",post.description);
      postData.append("image",post.image);
    }else{
       postData = {
        title: post.title,
        description:post.description,
        image:post.imagePath,
      };
      }

    this.http.put(BACKEND_URL+"/posts/"+post.id,postData).subscribe((data:any) => {
      this.router.navigate(["/"]);
    })
  }
}
