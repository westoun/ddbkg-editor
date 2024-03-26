import { Component, OnInit } from '@angular/core';
import { TripleService } from '../core/services/triple.service';
import { ActivatedRoute } from '@angular/router';
import Triple from '../core/types/triple';
import TriplesResponse from '../core/types/triples_response';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  objectId = null;
  triples: Triple[] = [];

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
}
