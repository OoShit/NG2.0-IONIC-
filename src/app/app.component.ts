import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/setList/setList';

import { EnterPage } from '../pages/enter/enter';
import { CookieService } from 'ng2-cookies';

@Component({
  templateUrl: 'app.html',
  providers: [ CookieService ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  cookies: Object;
  keys: Array<string>;
  account:string;
  password:string;
  rootPage: any = EnterPage;

  pages: Array<{title: string, component: any, icons:string}>;
  istrue:boolean;
  constructor(public platform: Platform, public statusBar: StatusBar,public cookieService: CookieService, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.update();

    for (var key in this.cookies)
    {
      this.account = key;
      this.password = this.cookies[key];
    }

    if(this.account && this.password){
      this.istrue = true;
      this.rootPage = HomePage;
    }else{
      this.istrue = false;
      this.rootPage = EnterPage;
    }

    this.pages = [
      { title: '主页', component: HomePage, icons:'md-home' },
      { title: '设置', component: ListPage, icons:'md-settings' }
    ];

  }

  update() {
    this.cookies = this.cookieService.getAll();
    this.keys = Object.keys(this.cookies);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
