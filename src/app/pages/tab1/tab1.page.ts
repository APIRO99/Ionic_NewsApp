import { Component, OnInit } from '@angular/core';
import { NoticesService } from '../../services/notices.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private noticesService: NoticesService) {}
  ngOnInit() {
    this.noticesService.getTopHeadlines(this.pageNum)
      .then( res => this.articles.push(...res.articles) )
    
  }

  articles: Article[] = [];
  pageNum = 1;
  complete = false;

  loadData = (ev:any) => {
    this.pageNum ++;

    this.noticesService.getTopHeadlines(this.pageNum)
      .then( res => {
        this.articles.push(...res.articles)
        if (this.articles.length === res.totalResults) this.complete = true;
      })
      .then( __ => ev.target.complete())
  }

}
