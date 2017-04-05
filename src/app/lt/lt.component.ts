import {
  Component, OnInit, Renderer, Output, EventEmitter, ViewChildren, AfterViewInit, Input
} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";

import {LtService} from "../services/lt.service";
import {luckenAnimations} from "./lt.animations";

@Component({
  selector: 'app-lt',
  templateUrl: './lt.component.html',
  styleUrls: ['./lt.component.scss'],
  animations: [luckenAnimations()]
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
   * Shake the wrong answers.
   * @type {boolean}
   */
  shakeIt: boolean = false;

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
    setInterval(() => {
      this.doShakeIt();
      setTimeout(() => {
        this.doNotShakeIt()
      }, 1000);
    }, 3000);
  }

  /**
   * Change flag to true.
   */
  doShakeIt() {
    this.shakeIt = true;
  }

  /**
   * Change flag to false.
   */
  doNotShakeIt() {
    this.shakeIt = false;
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

  isInputInvalid(thisInput: any) {
    return thisInput.status == "invalid";
  }

  /**
   * When an input control
   *
   * @param thisInput the input child
   * @param index in the loop of words
   */
  controlChanged(thisInput: any, index: number) {

    let nextEntry = this.findNextInvalidInputEntry(thisInput);
    let entry = thisInput;

    if (entry.value.trim() !== "")
      this.triesCnt++;

    if (this.testForm.controls['test']['controls'][index].valid) {

      this.rightAnswersCnt++;

      // input valid: animation
      entry.status = "valid";

      try {
        this.renderer.setElementAttribute(entry, 'disabled', 'disabled');
      } catch (e) {
      }
    } else {
      if (entry.value.trim() !== "")
        entry.status = "invalid";
    }

    try {
      this.renderer.invokeElementMethod(nextEntry.nativeElement, 'focus');
      this.renderer.invokeElementMethod(nextEntry.nativeElement, 'select');
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
   * Get the input entry for the given index.
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
  findNextInvalidInputEntry(thisInput: any): any {
    // next input entry not valid
    let e: any = this.inputChildren.find((obj, i, arr) => {
      if (arr[i - 1] && obj.nativeElement.status !== 'valid')
        return arr[i - 1].nativeElement.id == thisInput.id;
    });

    if (!e) {
      // we go to the first not valid
      e = this.inputChildren.find((obj) => {
        return obj.nativeElement.status !== 'valid';
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
  luckenInputStatus(thisInput: any) {
    return thisInput.status ? thisInput.status : "untouched";
  }

  /**
   * Percentage of inputs validated
   */
  successBarSize() {
    let barSize = (this.rightAnswersCnt / this.inputChildren.length) * 100;
    return `${barSize}%`;
  }

  getArray(str: string) {
    return str.split(' ');
  }

}
