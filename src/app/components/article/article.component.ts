import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  constructor(
    private iab: InAppBrowser,
    private socialSharing: SocialSharing,
    private asCtrl: ActionSheetController,
    private localDataService: LocalDataService,
    private toastController: ToastController
  ) { }
  ngOnInit() { }

  @Input() article: Article;
  @Input() i: number;
  @Input() onFavorite;

  redirectToArticle = () => this.iab.create(this.article.url, '_system');

  async presentActionSheet() {

    const favButton = (this.onFavorite) ?
      {
        text: 'Remove Favorite',
        icon: 'trash-outline',
        cssClass: 'action-dark',
        handler: () => {
          this.localDataService.deleteArticle( this.article );
          this.presentToast('Removed from Favorites');
        }
      } : {
        text: 'Favorite',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.localDataService.saveArticle( this.article );
          this.presentToast('Added to Favorites');
        }
      }


    const actionSheet = await this.asCtrl.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(
            this.article.title,
            this.article.source.name,
            '',
            this.article.url
          )
        }
      }, favButton, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

}
