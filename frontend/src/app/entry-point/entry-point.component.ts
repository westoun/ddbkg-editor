import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss'],
})
export class EntryPointComponent implements OnInit {
  objectId: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onLoadClicked() {
    this.router.navigateByUrl('editor/' + this.objectId);
  }
}
