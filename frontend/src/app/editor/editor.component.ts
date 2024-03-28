import { Component, OnInit } from '@angular/core';
import { TripleService } from '../core/services/triple.service';
import { ActivatedRoute } from '@angular/router';
import Triple from '../core/types/triple';
import TriplesResponse from '../core/types/triples_response';
import TripleUpdate from '../core/types/triple_update';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  objectId = null;
  triples: Triple[] = [];
  emitUpdateNow: boolean = false;

  unsavedChanges: number = 0;

  tripleUpdates: any = {};

  constructor(
    public tripleService: TripleService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async (val) => {
      const objectId = this.getObjectId();
      this.objectId = objectId;

      this.tripleService
        .getTriples(objectId)
        .then((triplesResponse: TriplesResponse) => {
          this.triples = triplesResponse.triples;
        })
        .catch((err) => {
          console.error(err);
          this.toastr.error(
            err['message'] + '.\nFor more details open the browser console.',
            'HTTP Error'
          );
        });
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
    this.tripleService
      .updateTriples(tripleUpdates)
      .then((res) => {
        this.toastr.success(
          'Your changes have been successfully sent to the server.',
          'Success'
        );
      })
      .catch((err) => {
        console.error(err);
        this.toastr.error(
          err['message'] + '.\nFor more details open the browser console.',
          'HTTP Error'
        );
      });
  }
}
