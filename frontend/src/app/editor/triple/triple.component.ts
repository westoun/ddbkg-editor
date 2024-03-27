import { Component, Input, OnInit } from '@angular/core';
import Triple from 'src/app/core/types/triple';

@Component({
  selector: 'app-triple',
  templateUrl: './triple.component.html',
  styleUrls: ['./triple.component.scss']
})
export class TripleComponent implements OnInit {
  @Input('triple') triple: Triple | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
