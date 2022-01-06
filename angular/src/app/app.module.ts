import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { TvChartContainerComponent } from './tv-chart-container/tv-chart-container.component';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    TvChartContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
