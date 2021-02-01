import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  constructor() { }
  ngOnInit() {}

  @Input() articles: Article[] = [];
  @Input() onFavorite = false;

}
