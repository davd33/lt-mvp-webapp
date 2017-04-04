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

  /**
   * List of the inputs in the form.
   * These will be focused after user enters good answers.
   */
  private inputList: Immutable.OrderedMap<number, { focused: boolean; input: any, status: string }>;

  constructor(private renderer: Renderer,
              private ltService: LtService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.inputList = Immutable.OrderedMap<number, { focused: boolean; input: any, status: string }>();
    this.getLt();
  }

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
   * Add input element reference to our list of inputs.
   *
   * @param index
   * @param input html element
   * @returns {boolean}
   */
  addInput(index: number, input: any) {
    if (!this.inputList.has(index)) {
      this.inputList = this.inputList.set(index, {focused: false, input: input, status: "invalid"});
    }
    return true;
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
   * @param index
   */
  controlChanged(index: number) {
    this.triesCnt++;

    let nextEntry = this.findNotYetFocusedInputEntry(index);
    let entry = this.getInputEntry(index);

    if (this.testForm.controls['test']['controls'][index].valid) {

      this.rightAnswersCnt++;

      // input should not get focus anymore
      entry.focused = true;
      // input valid: animation
      entry.status = "valid";

      try {
        this.renderer.setElementAttribute(entry.input, 'disabled', 'disabled');
      } catch (e) {
      }
    }

    try {
      this.renderer.invokeElementMethod(nextEntry.input, 'focus');
    } catch (e) {
    }

    if (this.testForm.valid) {
      setTimeout(() => {
        this.ltSuccess.emit({status: "valid"});
      }, 500);
    }
  }

  /**
   * Get the input entry (not the html element, rather the object
   * with 'focused', 'status' and 'input' fields) for the given index.
   *
   * @param index
   * @returns {focused: boolean; input: any, status: string}
   */
  getInputEntry(index: number): { focused: boolean; input: any, status: string } {
    return this.inputList.get(index);
  }

  /**
   * Finds the next input not yet validated by the user.
   *
   * @param index
   * @returns {focused: boolean; input: any, status: string}
   */
  findNotYetFocusedInputEntry(index: number): { focused: boolean; input: any, status: string } {
    // we go to the current input entry and take the next one
    let e: any = this.inputList.entrySeq()
      .skipUntil(kv => kv[0] == index).skip(1)
      .skipUntil(kv => !kv[1].focused).first();

    // we go to the first not focused if former method returns nothing
    if (!e) {
      e = this.inputList.entrySeq()
        .skipUntil(kv => !kv[1].focused).first();
    }

    // we raise an error in case there's no entry left
    if (!e) {
      throw new Error("No entry left.");
    }

    return e[1];
  }

  /**
   * Animation status for an input.
   * When 'valid' triggers 'hole' animation.
   *
   * @param index
   * @returns {string}
   */
  holeInputStatus(index: number) {
    let entry = this.getInputEntry(index);

    return entry ? entry.status : "invalid";
  }

  /**
   * Percentage of inputs validated
   */
  successBarSize() {
    let barSize = (this.rightAnswersCnt / this.inputList.size) * 100;
    return `${barSize}%`;
  }

}
