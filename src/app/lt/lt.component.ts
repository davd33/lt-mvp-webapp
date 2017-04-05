import {
  Component, OnInit, trigger, state, style, transition, animate, keyframes,
  Renderer, Output, EventEmitter, ViewChildren, AfterViewInit, Input
} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";

import * as Immutable from "immutable";
import {LtService} from "../services/lt.service";

@Component({
  selector: 'app-lt',
  templateUrl: './lt.component.html',
  styleUrls: ['./lt.component.scss'],
  animations: [
    trigger('hole', [
      state('invalid', style({transform: 'scale(1)'})),
      state('valid', style({transform: 'scale(1)'})),
      transition('* => valid', [
        animate('200ms ease-in', keyframes([
          style({transform: 'scale(4)'}),
          style({transform: 'scale(1)'})
        ]))
      ])
    ])
  ]
})
export class LtComponent implements OnInit, AfterViewInit {

  /**
   * Our test.
   */
  test: any;

  /**
   * Counter of tries: a try is counted when the user
   * press enter to validate his answer on an input.
   */
  triesCnt: number = 0;

  /**
   * Counter of the number of right answers.
   */
  rightAnswersCnt: number = 0;

  /**
   * Form group for the test.
   */
  testForm: FormGroup;

  /**
   * Inputs for focus.
   */
  @ViewChildren('thisInput') inputChildren;

  /**
   * Event emitted when lucken text is successfully filled.
   */
  @Output() ltSuccess = new EventEmitter();

  /**
   * Event emitted when lt test is not able to load.
   */
  @Output() loadTestError = new EventEmitter();

  /**
   * Level of the test (A2, B1...).
   */
  @Input() level: string;

  /**
   * Type of training: Verbs, Prepositions...
   */
  @Input() training: string;

  constructor(private renderer: Renderer,
              private ltService: LtService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getLt();
  }

  /**
   * After view init:
   *  -> focus first input
   */
  ngAfterViewInit() {
    this.inputChildren.changes.subscribe(elements => {
      elements.first.nativeElement.focus();
    });
  }

  /**
   * Get lt test according to level and training chosen.
   */
  getLt() {
    let error: string;

    if (this.level == "A2") {
      if (this.training == "prep") {
        this.ltService.getTestA2Prep()
          .then(lt => {
            this.test = lt;
            this.buildForm();
          });
      } else if (this.training == "verbs") {
        this.ltService.getTestA2Verbs()
          .then(lt => {
            this.test = lt;
            this.buildForm();
          });
      } else {
        error = "Training not available.";
      }
    } else if (this.level == "B1") {
      if (this.training == "prep") {
        this.ltService.getTestB1Prep()
          .then(lt => {
            this.test = lt;
            this.buildForm();
          });
      } else if (this.training == "verbs") {
        this.ltService.getTestB1Verbs()
          .then(lt => {
            this.test = lt;
            this.buildForm();
          });
      } else {
        error = "Training not available";
      }
    } else {
      error = "Level not available";
    }

    if (error) {
      this.loadTestError.emit({error: error});
    }
  }

  /**
   * Create group controls with their validators:
   *  - required
   *  - a regex to match the right answer
   */
  buildForm() {
    let testGroup: FormGroup = this.fb.group({});
    for (let w in this.test.text) {
      let word = this.test.text[w];

      if (word.isInput) {
        let control: FormControl = new FormControl();
        control.setValue('');
        control.setValidators([
          Validators.required,
          Validators.pattern(`^\\s*${word.value}\\s*$`)
        ]);

        testGroup.addControl(`${w}`, control);
      }
    }

    // build our form
    this.testForm = this.fb.group({
      'test': testGroup
    });
  }

  /**
   * When an input control
   *
   * @param thisInput the input child
   * @param index in the loop of words
   */
  controlChanged(thisInput: any, index: number) {
    this.triesCnt++;

    let nextEntry = this.findNotYetFocusedInputEntry(thisInput);
    let entry = thisInput;

    if (this.testForm.controls['test']['controls'][index].valid) {

      this.rightAnswersCnt++;

      // input should not get focus anymore
      entry.focused = true;
      // input valid: animation
      entry.status = "valid";

      try {
        this.renderer.setElementAttribute(entry, 'disabled', 'disabled');
      } catch (e) {
      }
    }

    try {
      this.renderer.invokeElementMethod(nextEntry.nativeElement, 'focus');
    } catch (e) {
    }

    if (this.testForm.valid) {
      setTimeout(() => {
        this.ltSuccess.emit({status: "valid"});
      }, 500);
      /* wait animation of success bar .5s */
    }
  }

  /**
   * Get the input entry (not the html element, rather the object
   * with 'focused', 'status' and 'input' fields) for the given index.
   *
   * @param index
   * @returns any
   */
  getInputEntry(index: number): any {
    return this.inputChildren.find((obj, i) => {
      return i == index;
    });
  }

  /**
   * Finds the next input not yet validated by the user.
   *
   * @param thisInput
   * @returns any
   */
  findNotYetFocusedInputEntry(thisInput: any): any {
    // we go to the current input entry and take the next one
    let e: any = this.inputChildren.find((obj, i, arr) => {
      if (arr[i - 1])
        return arr[i - 1].nativeElement.id == thisInput.id;
    });

    if (!e) {
      // we go to the first not focused
      e = this.inputChildren.find((obj) => {
        return !obj.nativeElement.focused;
      })
    }

    // we raise an error in case there's no entry left
    if (!e) {
      throw new Error("No entry left.");
    }

    return e;
  }

  /**
   * Animation status for an input.
   * When 'valid' triggers 'hole' animation.
   *
   * @param thisInput the input child
   * @returns {string}
   */
  holeInputStatus(thisInput: any) {
    return thisInput.status ? thisInput.status : "invalid";
  }

  /**
   * Percentage of inputs validated
   */
  successBarSize() {
    let barSize = (this.rightAnswersCnt / this.inputChildren.size) * 100;
    return `${barSize}%`;
  }

}
