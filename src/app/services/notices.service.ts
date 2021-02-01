import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NewsArray } from 'src/app/interfaces';
import { environment } from '../../environments/environment';

const { newsApiKet, apiURL } = environment;

const headers = new HttpHeaders({
  'X-Api-key': newsApiKet
})

@Injectable({
  providedIn: 'root'
})
export class NoticesService {
  constructor(private http: HttpClient) { }

  private ejectQuery = <T>(query: string) =>
    this.http.get<T>( apiURL + query, { headers }).toPromise()

  getTopHeadlines = (page: number) =>
    this.ejectQuery<NewsArray>(`/top-headlines?country=us&page=${page}`)

  
    getTopHeadlinesFiltered = (category: string, page:number) =>
      this.ejectQuery<NewsArray>(`/top-headlines?country=us&category=${category}&page=${page}`)
}
