import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'mapa-acessibilidade-front-v16';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isHandset = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngAfterViewInit() {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isHandset = result.matches;
        if (this.isHandset) {
          this.sidenav.close();
        } else {
          this.sidenav.open();
        }
      });
  }
}
