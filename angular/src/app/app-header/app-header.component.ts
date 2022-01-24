import { Component } from '@angular/core';
import { version } from '../../assets/charting_library';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  title = 'TradingView Charting Library and Angular 5 Integration Example ' + version();
}
