import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  home(){
    if(sessionStorage.getItem("userName")!=null)
    {
     var ch:boolean=confirm("Do u want to logout ?");
     if(ch){
      localStorage.removeItem("userName");
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("password");
      this.router.navigate(["/home"]);
     }
    }
    else{
      this.router.navigate(["/home"]);
    }
  }
  terms(){
    this.router.navigate(["/terms"]);
  }

  aboutUs(){
    this.router.navigate(["/aboutUs"]);
  }
  contactUs(){
    this.router.navigate(["/contactUs"]);
  }
}
