import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Triple from 'src/app/core/types/triple';
import TripleUpdate from 'src/app/core/types/triple_update';
import KG_PREFIXES_LOOKUP from 'src/assets/kg-prefixes';
import PROPERTY_BEHAVIOR_LOOKUP from 'src/assets/property-behavior';

@Component({
  selector: 'app-triple',
  templateUrl: './triple.component.html',
  styleUrls: ['./triple.component.scss'],
})
export class TripleComponent implements OnInit {
  isEditable: boolean = false;

  originalTriple: Triple | undefined;
  subject: string = '';
  predicate: string = '';
  object: string = '';

  @Input('triple') set triple_(triple: Triple) {
    this.originalTriple = triple;
    this.subject = triple.subject;
    this.predicate = triple.predicate;
    this.object = triple.object;
    this.isEditable = this.getEditability(triple);
  }

  @Output('tripleUpdateChange')
  tripleUpdateChange: EventEmitter<TripleUpdate | null> =
    new EventEmitter<TripleUpdate | null>();

  constructor() {}

  ngOnInit(): void {}

  private getEditability(triple: Triple): boolean {
    const predicate = triple.predicate;

    return false;
  }

  private emitUpdate(): void {
    if (!this.originalTriple) {
      return;
    }

    if (
      this.subject !== this.originalTriple.subject ||
      this.predicate !== this.originalTriple.predicate ||
      this.object !== this.originalTriple.object
    ) {
      const tripleUpdate: TripleUpdate = {
        originalTriple: this.originalTriple,
        updatedTriple: {
          subject: this.subject,
          predicate: this.predicate,
          object: this.object,
        },
      };
      this.tripleUpdateChange.emit(tripleUpdate);
    } else {
      this.tripleUpdateChange.emit(null);
    }
  }
}
