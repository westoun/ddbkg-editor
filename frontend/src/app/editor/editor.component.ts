import { Component, OnInit } from '@angular/core';
import { TripleService } from '../core/services/triple.service';
import { ActivatedRoute } from '@angular/router';
import Triple from '../core/types/triple';
import TriplesResponse from '../core/types/triples_response';
import TripleUpdate from '../core/types/triple_update';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  objectId = null;
  triples: Triple[] = [];
  emitUpdateNow: boolean = false;

  tripleUpdates: any = {};

  constructor(
    public tripleService: TripleService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (val) => {
      const objectId = this.getObjectId();
      this.objectId = objectId;

      const triplesResponse: TriplesResponse =
        await this.tripleService.getTriples(objectId);
      this.triples = triplesResponse.triples;
    });
  }

  private getObjectId() {
    return this.route.snapshot.params['objectId'];
  }

  onTripleUpdateEmitted(update: TripleUpdate | null, index: number) {
    this.tripleUpdates[index] = update;
  }

  onSubmitChangesClicked() {
    const tripleUpdates: TripleUpdate[] = [];

    for (const key of Object.keys(this.tripleUpdates)) {
      if (this.tripleUpdates[key]) {
        tripleUpdates.push(this.tripleUpdates[key]);
      }
    }

    const timestamp = new Date().toISOString();
    tripleUpdates.forEach((update) => {
      update.timestamp = timestamp;
    });
    this.tripleService.updateTriples(tripleUpdates);
  }
}
