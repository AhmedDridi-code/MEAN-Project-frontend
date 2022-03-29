import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/models/Post';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { mimeType } from './mime-type.validator';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  private mode = 'create';
  private id:string="";
  private post?:Post;
   title:string="";
   description :string="";
   imagePreview:string="";

  postForm =this.formBuilder.group({
    title:['',[Validators.required,Validators.maxLength(7)]],
    description:['',[Validators.required]],
    image:['',[],[mimeType]],
  })
  constructor(public postService:PostService,private formBuilder: FormBuilder,public route :ActivatedRoute,public router :Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has("id")){
        this.mode="edit";
        this.id = paramMap.get("id") || "";
        console.log("id in paramMap: "+this.id);
        this.post=this.postService.getPost(this.id);
        this.postForm.setValue({"title":this.post?.title,"description":this.post?.description});
      }else{
        this.mode='create';
        this.id="";
      }
    });
  }

  onAddPost(){
    if(this.postForm.valid){
      if(this.mode==="create"){
        let post =this.postForm.value;
        this.postService.addPost(post);
        this.postForm.reset();
      }else{
        let post =this.postForm.value;
        post.id=this.id
        console.log("id in post: "+this.id);
        this.postService.updatedPost(post);
        this.postForm.reset();
      }
      this.router.navigate(["/"]);
    }
}
onImagePicked(imageInput: any) {
    const file : File = imageInput.files[0];
    this.postForm.patchValue({image: file});
    this.postForm.get("image")?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview=reader.result as string;
    };
    reader.readAsDataURL(file);
}

get name() { return this.postForm.get('name'); }

get power() { return this.postForm.get('power'); }
}


