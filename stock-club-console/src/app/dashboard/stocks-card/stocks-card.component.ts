import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';
import { Stock } from 'src/app/common/types';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'stocks-card',
  templateUrl: './stocks-card.component.html',
  styleUrls: ['./stocks-card.component.scss']
})
export class StocksCardComponent implements OnInit {

  public stocks: Stock[] = [];
  public selectedStockId: string = '';
  public stockSearch: string = '';
  public stockSearchResults: any[] = [];

  @ViewChild('stockSearchInput') stockSearchInput: any;

  constructor(private stocksService: StocksService) { }

  ngOnInit() {
    this.stocksService.getStocks().subscribe((stockData: Stock[]) => {
      this.stocks = stockData;
    }, error => {
      // TODO: handle error case
    });
  }

  public searchStocks(): void {
    if (this.stockSearch) {
      this.stocksService.searchStocks(this.stockSearch).subscribe((stockSearchResults: any) => {
        this.stockSearchResults = stockSearchResults;
        this.stockSearch = this.stockSearch + ' ';
        this.stockSearchInput.nativeElement.value = 'butt';
        console.log('search results: ' + stockSearchResults.map((item) => item['1. symbol']));
        console.log('search result 1st: ' + stockSearchResults.map((item) => item['1. symbol'])[0]);
        console.log('type: ' + typeof stockSearchResults.map((item) => item['1. symbol'])[0]);
      });
    }
  }

  search = (text$: Observable<string>) => {
    console.log('got here in search 111111111111111');
    return text$.pipe(
      // debounceTime(200),
      map(term => {
        console.log('term updated: ' + term);
        return this.stockSearchResults.map((item) => item['1. symbol']);
      })
    );
    }
}
