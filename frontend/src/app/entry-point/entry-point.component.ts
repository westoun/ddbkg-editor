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
    let objectId = this.objectId;

    if (!objectId.includes("http")) {
      objectId = "http://www.deutsche-digitale-bibliothek.de/item/" + objectId;
    }

    this.router.navigateByUrl('editor/' + encodeURIComponent(objectId));
  }
}
