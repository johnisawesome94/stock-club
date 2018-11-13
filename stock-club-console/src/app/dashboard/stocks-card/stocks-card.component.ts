import { Component, OnInit } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';
import { Stock } from 'src/app/common/types';

@Component({
  selector: 'stocks-card',
  templateUrl: './stocks-card.component.html',
  styleUrls: ['./stocks-card.component.scss']
})
export class StocksCardComponent implements OnInit {

  public stocks: Stock[] = [];
  public selectedStockId: string = '';

  constructor(private stocksService: StocksService) { }

  ngOnInit() {
    this.stocksService.getStocks().subscribe((stockData: Stock[]) => {
      this.stocks = stockData;
    }, error => {
      // TODO: handle error case
    });
  }

}
