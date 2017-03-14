import {
  Component, OnInit, trigger, state, style, transition, animate, keyframes,
  Renderer, Output, EventEmitter, ViewChildren, AfterViewInit
} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";

import * as Immutable from "immutable";
import {LtService} from "./lt.service";

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
    ]),
    trigger('thermometer', [
      transition(':enter', [
        animate('0.1s ease-in', keyframes([
          style({transform: 'translateX(+100%)'}),
          style({transform: 'translateX(0)'})
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
   * List of the inputs in the form.
   * These will be focused after user enters good answers.
   */
  private inputList: Immutable.OrderedMap<number, {focused: boolean; input: any, status: string}>;

  constructor(private renderer: Renderer,
              private ltService: LtService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.inputList = Immutable.OrderedMap<number, {focused: boolean; input: any, status: string}>();
    this.getLt();
  }

  ngAfterViewInit() {
    this.inputChildren.changes.subscribe(elements => {
      elements.first.nativeElement.focus();
    });
  }

  getLt() {
    this.ltService.getTests()
      .then(lt => {
        this.test = lt[0];
        this.buildForm();
      });
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
    this.testForm.statusChanges.subscribe(status => {
      if (status === "VALID") {
        this.ltSuccess.emit({status: "valid"});
      }
    })
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
  }

  /**
   * Get the input entry (not the html element, rather the object
   * with 'focused', 'status' and 'input' fields) for the given index.
   *
   * @param index
   * @returns {focused: boolean; input: any, status: string}
   */
  getInputEntry(index: number): {focused: boolean; input: any, status: string} {
    return this.inputList.get(index);
  }

  /**
   * Finds the next input not yet validated by the user.
   *
   * @param index
   * @returns {focused: boolean; input: any, status: string}
   */
  findNotYetFocusedInputEntry(index: number): {focused: boolean; input: any, status: string} {
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

  private SCORE_0_CSS = 'fa-thermometer-empty shake-opacity shake-constant lt-score-aweful';
  private SCORE_1_CSS = 'fa-thermometer-quarter shake shake-constant lt-score-bad';
  private SCORE_2_CSS = 'fa-thermometer-half lt-score-mediocre';
  private SCORE_3_CSS = 'fa-thermometer-three-quarters lt-score-good';
  private SCORE_4_CSS = 'fa-thermometer-full lt-score-perfect';

  scoreClass() {
    if (this.triesCnt == 0) {
      return;
    }

    let score: number = this.rightAnswersCnt / this.triesCnt;
    score = Math.ceil(score * 4);

    if (score === 4) {
      return this.SCORE_4_CSS;
    } else if (score === 3) {
      return this.SCORE_3_CSS;
    } else if (score === 2) {
      return this.SCORE_2_CSS;
    } else if (score === 1) {
      return this.SCORE_1_CSS;
    } else if (score === 0) {
      return this.SCORE_0_CSS;
    }
  }

}
