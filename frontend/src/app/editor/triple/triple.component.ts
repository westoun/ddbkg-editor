import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Triple from 'src/app/core/types/triple';
import TripleUpdate from 'src/app/core/types/triple_update';
import PROPERTY_BEHAVIOR_LOOKUP from 'src/assets/property-behavior';
import {
  isInBrackets,
  removeBrackets,
  addBrackets,
  isEqualExceptBrackets,
} from 'src/app/core/utils/string_utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-triple',
  templateUrl: './triple.component.html',
  styleUrls: ['./triple.component.scss'],
})
export class TripleComponent implements OnInit {
  isEditable: boolean = false;
  editMode: boolean = false;
  isValid: boolean = true;

  originalTriple: Triple | undefined;
  subject: string = '';
  predicate: string = '';
  object: string = '';

  @Input('showSubject') showSubject: boolean = false;

  @Input('triple') set triple_(triple: Triple) {
    this.originalTriple = triple;
    this.subject = removeBrackets(triple.subject);
    this.predicate = removeBrackets(triple.predicate);
    this.object = removeBrackets(triple.object);
    this.isEditable = this.getEditability(triple);
  }

  @Output('tripleUpdateChange')
  tripleUpdateChange: EventEmitter<TripleUpdate | null> =
    new EventEmitter<TripleUpdate | null>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onEditClicked() {
    this.editMode = true;
  }

  onSaveClicked() {
    this.editMode = false;
    this.emitUpdate();
  }

  onResetClicked() {
    this.editMode = false;

    if (!this.originalTriple) {
      return;
    }

    this.object = removeBrackets(this.originalTriple.object);
  }

  private getEditability(triple: Triple): boolean {
    let predicate = triple.predicate;

    if (isInBrackets(predicate)) {
      predicate = removeBrackets(predicate);
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
      !isEqualExceptBrackets(this.subject, this.originalTriple.subject) ||
      !isEqualExceptBrackets(this.predicate, this.originalTriple.predicate) ||
      !isEqualExceptBrackets(this.object, this.originalTriple.object)
    ) {
      const tripleUpdate: TripleUpdate = {
        originalTriple: this.originalTriple,
        updatedTriple: {
          subject: isInBrackets(this.originalTriple.subject)
            ? addBrackets(this.subject)
            : this.subject,
          predicate: isInBrackets(this.originalTriple.predicate)
            ? addBrackets(this.predicate)
            : this.predicate,
          object: isInBrackets(this.originalTriple.object)
            ? addBrackets(this.object)
            : this.object,
        },
      };
      this.tripleUpdateChange.emit(tripleUpdate);
    } else {
      this.tripleUpdateChange.emit(null);
    }
  }

  onNavigateToClicked(object: string): void {
    const link = 'editor/' + encodeURIComponent(object);
    window.open(link, '_blank');
  }
}
