import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController,Platform } from 'ionic-angular';
import { CookieService } from 'ng2-cookies';

declare var window;

@Component({
  selector: 'page-list',
  templateUrl: 'setList.html',
  providers: [ CookieService ]
})
export class ListPage {
  cookies: Object;
  keys: Array<string>;
  account:string;
  password:string;
  today:number;
  hour:number;
  alias: string = '';
  msgList:Array<any>=[];

  constructor(public navCtrl: NavController,
  	public alertCtrl: AlertController,
  	public cookieService: CookieService,
  	public platform: Platform,) {

    this.update();

    this.today = Date.now();
    setInterval(()=>{
    	this.today = Date.now();
    },1000);

    if (window.plugins && 　window.plugins.jPushPlugin){
        window.plugins.jPushPlugin.init();
        document.addEventListener("jpush.receiveNotification", () =>{
            this.msgList.push({content:window.plugins.jPushPlugin.receiveNotification.alert})
          },false);
      }


  }

  update() {
    this.cookies = this.cookieService.getAll();
    this.keys = Object.keys(this.cookies);
  }

	// 退出提示
  goToOtherPage(){
  	let confirm = this.alertCtrl.create({
      message: '确定要退出并清除账号信息吗?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.cookieService.deleteAll();
    				this.update();
    				this.platform.exitApp();
          }
        }
      ]
    });
    confirm.present();
  }

}
