import { Component, OnInit } from '@angular/core';
import Tracer from "../bl-gui-tracer/tracer";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    tracer = new Tracer();
    trace(event: Event) {
    	this.tracer.trace(event);
    }
}
