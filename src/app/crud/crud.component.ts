import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})

export class CrudComponent extends AppComponent implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {
    this.fillTableContents();
  }

}
