import { Component, OnInit } from '@angular/core';
import { Post } from './models/Post';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'SocialMedia';
  storedPost:Post[]=[];
  constructor(public authService: AuthService){}
  ngOnInit(){
    this.authService.autoAuthUser();
  }


  onPostAdded(post:Post){
    this.storedPost.push(post);
  }
}
