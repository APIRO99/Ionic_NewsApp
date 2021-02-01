import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {
  constructor(private storage: Storage) { }

  articles: Article[] = [];

  saveArticle = (article: Article) => {
    const exists = this.articles.find(art => art.title === article.title);

    if (!exists) {
      this.articles.unshift(article);
      this.storage.set('fav', this.articles);
    }

    return exists;
  }

  deleteArticle = (article: Article) => {
    this.articles = this.articles.filter(art => art.title != article.title);
    this.storage.set('fav', this.articles);
  }

  loadFavorite = async () => {
    const favs = await this.storage.get('fav');
    if (favs) this.articles = favs;
  }

}
