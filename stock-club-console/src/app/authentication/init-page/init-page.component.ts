import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.scss'],
})
export class InitPageComponent implements OnInit {

  public showPage: string = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      console.log('data.page: ' + data.page);
      this.showPage = data.page;
    });
  }

}
