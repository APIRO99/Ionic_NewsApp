import { Component, OnInit } from '@angular/core';
import { NoticesService } from 'src/app/services/notices.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  constructor( private noticesService: NoticesService) { }
  ngOnInit() {  
    this.currentCategory = this.categories[0];
    this.loadData(this.currentCategory)
  }

  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
  articles: Article[] = [];

  currentCategory:string;
  curretnPage: number = 0;
  complete: boolean = false;

  loadData = async (category:string) => {
    this.curretnPage++;

    const res = await this.noticesService.getTopHeadlinesFiltered(category, this.curretnPage)
    this.articles.push(...res.articles);
    return this.articles.length === res.totalResults;
  }

  segmentChanged = ({ detail }) => {
    this.articles = [];
    this.curretnPage = 0;
    this.currentCategory = detail.value;
    return this.loadData(this.currentCategory)
  }


  infiniteScrollLoad = async (ev: any) => {
    this.complete = await this.loadData(this.currentCategory);
    ev.target.complete();
  }
  
}
