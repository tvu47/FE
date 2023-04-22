import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public getCurrentLink(){
    return this.router.url;
  }

  public getClassActive(url: string){
    if(url === this.getCurrentLink()){
      return "active bg-gradient-primary";
    }
    return "";
  }

}
