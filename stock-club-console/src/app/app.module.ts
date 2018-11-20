import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './authentication/init-page/login/login.component';
import { JwtInterceptor } from './authentication/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './authentication/interceptors/error.interceptor';
import { FundsCardComponent } from './dashboard/funds-card/funds-card.component';
import { MembersCardComponent } from './dashboard/members-card/members-card.component';
import { AddMemberModalComponent } from './dashboard/members-card/add-member-modal/add-member-modal.component';
import { AddFundsModalComponent } from './dashboard/funds-card/add-funds-modal/add-funds-modal.component';
import { InitPageComponent } from './authentication/init-page/init-page.component';
import { RegisterComponent } from './authentication/init-page/register/register.component';
import { StocksCardComponent } from './dashboard/stocks-card/stocks-card.component';
import { MatAutocompleteModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatDialogModule, MatButtonModule, MatCardModule, MatListModule } from '@angular/material';
import { BuySellStockModalComponent } from './dashboard/stocks-card/buy-sell-stock-modal/buy-sell-stock-modal.component';
import { CurrencyDirective } from './common/directives/currency.directive';
import { NumberOnlyDirective } from './common/directives/number-only.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AddMemberModalComponent,
    FundsCardComponent,
    MembersCardComponent,
    AddFundsModalComponent,
    InitPageComponent,
    RegisterComponent,
    StocksCardComponent,
    BuySellStockModalComponent,
    CurrencyDirective,
    NumberOnlyDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  entryComponents: [
    AddMemberModalComponent,
    AddFundsModalComponent,
    BuySellStockModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
