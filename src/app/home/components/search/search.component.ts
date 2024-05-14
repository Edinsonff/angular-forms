import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchField = new FormControl('');
  results: any

  constructor(
    private http: HttpClient,

  ) { }

  ngOnInit(): void {
    this.searchField.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe( (value) => {
      this.getData(value);
    })
  }

  private getData(query: string) {
    const API = '2CWVPGMdamNl5X8TKynyqvq75jKF5deo';
    this.http.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API}&limit=12`)
    .pipe(
      map( (response: any) => {
        return response.data.map(item => item.images.downsized)
      })
    )
    .subscribe((data) => {
      console.log('data', data);
      this.results = data;
    })
  }
}
