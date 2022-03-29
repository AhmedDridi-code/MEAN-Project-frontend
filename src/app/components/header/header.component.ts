import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsAuthenticated = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated=this.authService.isAuthenticated || false;
    this.authService.getAuthStatusListener().subscribe((status) => {
      this.userIsAuthenticated = status;
    })
  }

  onLogout(){
    this.authService.logout();
  }

}
