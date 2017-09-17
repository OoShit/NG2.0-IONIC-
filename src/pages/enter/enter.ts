import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { CookieService } from 'ng2-cookies';
@Component({
  selector: 'page-enter',
  templateUrl: 'enter.html',
  providers: [ CookieService ]
})
export class EnterPage {
	account:string;
	password:string;
	cookies: Object;
	keys: Array<string>;
	checked:boolean;
  constructor(public navCtrl: NavController,public cookieService: CookieService,public platform: Platform) {
  	this.checked = true;
  	this.update();
    for (var key in this.cookies)
    {
    	this.account = key;
    	this.password = this.cookies[key];
    }
  }


  update() {
    this.cookies = this.cookieService.getAll();
    this.keys = Object.keys(this.cookies);
  }

  // addCookie(account:string,password:string) {
  //   console.log(account,password);
  //   this.cookieService.set(account,password);
  //   this.update();
  // }
  // removeAll() {
  //   this.cookieService.deleteAll();
  //   this.update();
  //   console.log(this.cookies)
  // }

  logIn(account,password){
  	if(account == 'admin' && password == 'admin'){
  		this.cookieService.set(account,password);
	    this.update();
	  	location.reload();
  	}else{
  		alert("账号或密码有误")
  	}
		
  }
  
}
