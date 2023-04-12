import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zim-test',
  templateUrl: './zim-test.component.html',
  styleUrls: ['./zim-test.component.scss']
})
export class ZimTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    new Frame(FIT, 1024, 768, light, dark, this.ready);
  }

  ready() {
    new Circle(100, blue)
      .center()
      .drag();
  }
}
