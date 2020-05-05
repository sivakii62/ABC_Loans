import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todaysDate=new Date();

  constructor(private router:Router)
  {
    setInterval(()=>{this.todaysDate=new Date();},1000);
  }
  au(){
    this.router.navigate(["aboutUs"]);
  }
}
