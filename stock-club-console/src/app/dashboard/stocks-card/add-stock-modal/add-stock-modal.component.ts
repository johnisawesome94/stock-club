import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationTypes, UpdateStock } from 'src/app/common/types';
import { MatAutocompleteTrigger, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-stock-modal',
  templateUrl: './add-stock-modal.component.html',
  styleUrls: ['./add-stock-modal.component.scss']
})
export class AddStockModalComponent implements OnInit {
  
  public stock: UpdateStock = new UpdateStock('', 0, 0, 0);
  public stockSearchResults: any[] = [];
  @ViewChild('stockTickerInput', { read: MatAutocompleteTrigger }) autoComplete: MatAutocompleteTrigger;


  constructor(public dialogRef: MatDialogRef<AddStockModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stocksService: StocksService,
    private notificationService: NotificationService) { }

  ngOnInit() {}

  public addStock(): void {
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
}
