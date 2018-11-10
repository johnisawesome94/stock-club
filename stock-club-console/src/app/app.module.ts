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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  entryComponents: [
    AddMemberModalComponent,
    AddFundsModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
