import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationTypes, UpdateStock, Stock } from 'src/app/common/types';
import { MatAutocompleteTrigger, MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';
import { FormControl } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {

  constructor(private existingStock: Stock, private newStock: UpdateStock) {}

  isErrorState(control: FormControl | null): boolean {
    return !!(control && (control.dirty || control.touched) && this.existingStock && this.existingStock.numberOfShares < this.newStock.numberOfShares);
  }
}

@Component({
  selector: 'app-buy-sell-stock-modal',
  templateUrl: './buy-sell-stock-modal.component.html',
  styleUrls: ['./buy-sell-stock-modal.component.scss']
})
export class BuySellStockModalComponent implements OnInit {

  public existingStock: Stock;
  public stock: UpdateStock;
  public stockSearchResults: any[] = [];
  @ViewChild('stockTickerInput', { read: MatAutocompleteTrigger }) autoComplete: MatAutocompleteTrigger;
  public confirmButton: string = '';

  /** Error when invalid control is dirty, touched, or submitted. */
  public errorStateMatcher: ErrorStateMatcher;

  constructor(public dialogRef: MatDialogRef<BuySellStockModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stock: Stock },
    private stocksService: StocksService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.existingStock = this.data.stock;
    if (this.existingStock) {
      this.stock = new UpdateStock(this.data.stock.ticker, null, null);
      this.errorStateMatcher = new MyErrorStateMatcher(this.existingStock, this.stock);
      this.confirmButton = 'Sell';
    } else {
      this.stock = new UpdateStock('', null, null);
      this.confirmButton = 'Buy';
    }
  }

  public updateStock(): void {
    this.stocksService.postStocks(this.stock).subscribe(() => {
      this.notificationService.addNotification(NotificationTypes.Success, 'Successfully added stocks', true);
    }, () => {
      this.notificationService.addNotification(NotificationTypes.Danger, 'Failed to add stocks', true);
    }, () => {
      this.dialogRef.close('add');
    });
  }

  public searchStocks(): void {
    if (this.stock.ticker) {
      this.stocksService.searchStocks(this.stock.ticker).subscribe((stockSearchResults: any) => {
        this.stockSearchResults = stockSearchResults.map((item) => item['1. symbol']);
        this.autoComplete.openPanel();
      });
    }
  }

  private confirmDisabled(): boolean {
    const empty: boolean = !this.stock.numberOfShares || !this.stock.pricePerShare || !this.stock.ticker,
      notValid: boolean = this.existingStock ? this.existingStock.numberOfShares < this.stock.numberOfShares : false;
    return empty || notValid;
  }
}
