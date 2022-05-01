import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent extends AppComponent implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {
    this.fillTableContents(false, true);
  }
}

