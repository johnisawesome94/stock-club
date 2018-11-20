import { Component, OnInit, ViewChild } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';
import { Stock } from 'src/app/common/types';
import { MatAutocompleteTrigger, MatDialog } from '@angular/material';
import { BuySellStockModalComponent } from './buy-sell-stock-modal/buy-sell-stock-modal.component';

@Component({
  selector: 'stocks-card',
  templateUrl: './stocks-card.component.html',
  styleUrls: ['./stocks-card.component.scss']
})
export class StocksCardComponent implements OnInit {

  public stocks: Stock[] = [];
  public selectedStock: Stock;
  public stockSearch: string = '';
  public stockSearchResults: any[] = [];

  @ViewChild('stockSearchInput', { read: MatAutocompleteTrigger }) autoComplete: MatAutocompleteTrigger;

  constructor(private stocksService: StocksService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getStocks();
  }

  public getStocks(): void {
    this.stocksService.getStocks().subscribe((stockData: Stock[]) => {
      this.stocks = stockData;
    }, error => {
      // TODO: handle error case
    });
  }

  public searchStocks(): void {
    if (this.stockSearch) {
      this.stocksService.searchStocks(this.stockSearch).subscribe((stockSearchResults: any) => {
        this.stockSearchResults = stockSearchResults.map((item) => item['1. symbol']);
        this.autoComplete.openPanel();
      });
    }
  }

  public openBuySellStockModal(stock?: Stock): void {
    const dialogRef = this.dialog.open(BuySellStockModalComponent, {
      width: '',
      autoFocus: false,
      data: {
        stock: stock ? stock : null
      }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'add') {
        this.getStocks();
      }      
    });
  }
}
