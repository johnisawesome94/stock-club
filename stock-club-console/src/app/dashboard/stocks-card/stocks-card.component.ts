import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';
import { Stock } from 'src/app/common/types';
import { MatAutocompleteTrigger, MatDialog } from '@angular/material';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddStockModalComponent } from './add-stock-modal/add-stock-modal.component';

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

  @ViewChild('stockSearchInput', { read: MatAutocompleteTrigger }) autoComplete: MatAutocompleteTrigger;

  constructor(private stocksService: StocksService, private modalService: NgbModal, private dialog: MatDialog) { }

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
        this.stockSearchResults = stockSearchResults.map((item) => item['1. symbol']);
        this.autoComplete.openPanel();
      });
    }
  }

  public openAddStockModal(): void {
    const dialogRef = this.dialog.open(AddStockModalComponent, {
      width: '',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
      if (result === 'add') {
        // TODO
        //this.getStocks();
      }      
    });
  }
}
