import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Triple from 'src/app/core/types/triple';
import TripleUpdate from 'src/app/core/types/triple_update';
import PROPERTY_BEHAVIOR_LOOKUP from 'src/assets/property-behavior';

@Component({
  selector: 'app-triple',
  templateUrl: './triple.component.html',
  styleUrls: ['./triple.component.scss'],
})
export class TripleComponent implements OnInit {
  isEditable: boolean = false;
  isValid: boolean = true;

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
    let predicate = triple.predicate;

    if (predicate.startsWith('<') && predicate.endsWith('>')) {
      predicate = predicate.slice(1, -1);
    }

    if (predicate in PROPERTY_BEHAVIOR_LOOKUP) {
      return PROPERTY_BEHAVIOR_LOOKUP[predicate].editable;
    }

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
