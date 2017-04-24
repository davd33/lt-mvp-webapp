import {
  Component, OnInit, Output, EventEmitter, ViewChildren,
  AfterViewInit, Input, Renderer2, OnDestroy, AfterViewChecked, ElementRef
} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import {LtService} from '../services/lt.service';
import {luckenAnimations} from './lt.animations';

@Component({
  selector: 'app-lt',
  templateUrl: './lt.component.html',
  styleUrls: ['./lt.component.scss'],
  animations: [luckenAnimations()]
})
export class LtComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {

  /**
   * Our test.
   */
  test: any;

  /**
   * Counter of tries: a try is counted when the user
   * press enter to validate his answer on an input.
   */
  triesCnt = 0;

  /**
   * Counter of the number of right answers.
   */
  rightAnswersCnt = 0;

  /**
   * The currently focused input.
   */
  inputFocused: any;

  /**
   * Form group for the test.
   */
  testForm: FormGroup;

  /**
   * Shake the wrong answers.
   * @type {boolean}
   */
  shakeIt = false;

  /**
   * Shake interval to be set and cleared.
   */
  shakeInterval: number;

  /**
   * Object containing meta info of input children:
   * [{
   *  id: status
   * }]
   */
  inputObj: any = [];

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

  constructor(private renderer: Renderer2,
              private ltService: LtService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getLt();

    this.shakeInterval = setInterval(() => {
      this.doShakeIt();
      setTimeout(() => {
        this.doNotShakeIt();
      }, 1000);
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.shakeInterval);
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

  ngAfterViewChecked() {
    this.inputChildren.forEach((obj) => {
      if (!this.inputObj[obj.nativeElement.id]) {
        this.inputObj[obj.nativeElement.id] = "untouched";
      }
    });
  }

  /**
   * Get lt test according to level and training chosen.
   */
  getLt() {
    let error: string;

    if (this.level === 'A2') {
      if (this.training === 'prep') {
        this.ltService.getTestA2Prep()
          .then(lt => {
            this.test = lt;
            this.buildForm();
          });
      } else if (this.training === 'verbs') {
        this.ltService.getTestA2Verbs()
          .then(lt => {
            this.test = lt;
            this.buildForm();
          });
      } else {
        error = 'Training not available.';
      }
    } else if (this.level === 'B1') {
      if (this.training === 'prep') {
        this.ltService.getTestB1Prep()
          .then(lt => {
            this.test = lt;
            this.buildForm();
          });
      } else if (this.training === 'verbs') {
        this.ltService.getTestB1Verbs()
          .then(lt => {
            this.test = lt;
            this.buildForm();
          });
      } else {
        error = 'Training not available';
      }
    } else {
      error = 'Level not available';
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
    const testGroup: FormGroup = this.fb.group({});
    for (let w = 0; w < this.test.text.length; w++) {
      const word = this.test.text[w];

      if (word.isInput) {
        const control: FormControl = new FormControl();
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
    let status = this.getStatusValue(thisInput);

    if (status) {
      return 'invalid' === status;
    } else {
      return false;
    }
  }

  /**
   * When an input control
   *
   * @param thisInput the input child
   * @param index in the loop of words
   */
  controlChanged(event: any, thisInput: any, index: number) {
    event.preventDefault();

    const entryInput = this.getInputEntry(thisInput);

    if (event.key === 'Enter') {

      if (entryInput.nativeElement.value.trim() !== '') {
        this.triesCnt++;
      }

      if (this.testForm.controls['test']['controls'][index].valid) {

        this.rightAnswersCnt++;

        this.setStatusValue(thisInput, 'valid');

        try {
          this.renderer.setAttribute(entryInput.nativeElement, 'disabled', 'disabled');
        } catch (e) {
        }
      } else if (entryInput.nativeElement.value.trim() !== '') {
        this.setStatusValue(thisInput, 'invalid');
      }
    }

    try {
      const nextInput = this.findNextInvalidInputEntry(thisInput);
      this.focusInput(nextInput);
    } catch (e) {
    }

    if (this.testForm.valid) {
      setTimeout(() => {
        this.ltSuccess.emit({status: 'valid'});
      }, 500);
      /* wait animation of success bar .5s */
    }
  }

  /**
   * Focus the native element of the parameter
   * and call selectInput.
   * @param thisInput
   */
  focusInput(thisInput) {
    if (thisInput) {
      thisInput.nativeElement.focus();
      this.selectInput(thisInput);
    }
  }

  /**
   * Select text inside an input element.
   * @param thisInput ViewChild variable
   */
  selectInput(thisInput: any) {
    thisInput.nativeElement.select();
  }

  /**
   * Get the input ViewChild entry in the
   * 'this.inputChildren' field.
   * @param thisInput
   */
  getInputEntry(thisInput: any) {
    if (thisInput) {
      return this.inputChildren.find((obj) => {
        return obj.nativeElement.id === thisInput.id;
      });
    }
  }

  /**
   * Get the status of the input:
   *  - untouched,
   *  - valid,
   *  - invalid.
   * @param thisInput
   * @returns {any}
   */
  getStatusValue(thisInput: any) {
    return this.getStatusValueByElementRef(this.getInputEntry(thisInput));
  }

  /**
   * Get the status of the input:
   *  - untouched,
   *  - valid,
   *  - invalid.
   * @param elRef the input child reference
   * @returns {any}
   */
  getStatusValueByElementRef(elRef: ElementRef) {
    if (elRef) {
      return this.inputObj[elRef.nativeElement.id];
    }
  }

  /**
   * Set the status of the input:
   *  - untouched,
   *  - valid,
   *  - invalid.
   * @param thisInput
   * @param newValue
   */
  setStatusValue(thisInput: any, newValue: string) {
    this.setStatusValueByElementRef(this.getInputEntry(thisInput), newValue);
  }

  /**
   * Set the status of the input:
   *  - untouched,
   *  - valid,
   *  - invalid.
   * @param elRef the input child reference
   * @param newValue
   */
  setStatusValueByElementRef(elRef: ElementRef, newValue: string) {
    if (elRef) {
      this.inputObj[elRef.nativeElement.id] = newValue;
    }
  }

  isLastInputChild(thisInput: any) {
    return thisInput.id === this.inputChildren.last.nativeElement.id;
  }

  /**
   * Finds the next input not yet validated by the user.
   *
   * @param thisInput
   * @returns any
   */
  findNextInvalidInputEntry(thisInput: any): any {

    let e: any = this.inputChildren.find((obj, i) => {
      let status = this.getStatusValueByElementRef(obj);

      let sameInput = obj.nativeElement.id === thisInput.id;
      let greaterId = (!this.isLastInputChild(thisInput)) ? obj.nativeElement.id > thisInput.id : true;

      return status !== 'valid' && !sameInput && greaterId;
    });

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
    const status = this.getStatusValue(thisInput);

    if (status) {
      return status;
    } else {
      return "untouched";
    }
  }

  /**
   * Percentage of inputs validated.
   * @returns {string}
   */
  successBarSize() {
    const barSize = (this.rightAnswersCnt / this.inputChildren.length) * 100;
    if (`${barSize}` === 'NaN') {
      return '0%';
    }
    return `${barSize}%`;
  }

  /**
   * Split a string in an array of strings.
   * @param str
   * @returns {string[]}
   */
  getArray(str: string) {
    return str.split(' ');
  }

  /**
   * Is this string a punctuation.
   * @param str
   * @returns {boolean|RegExpMatchArray|null}
   */
  isPoint(str: string) {
    return str.length === 1 && str.match(/[!?,.:;]/);
  }

  /**
   * When user clicks on input:
   *  -> focus and select this input.
   * @param thisInput
   */
  onInputClick(thisInput: any) {
    this.setInputFocused(this.getInputEntry(thisInput));
    this.focusInput(this.getInputEntry(thisInput));
  }

  setInputFocusedExplanation(value: string) {
    if (this.inputFocused) {
      this.inputFocused.explanation = value;
    }
  }

  setInputFocused(elRef: ElementRef) {
    if (elRef) {
      this.inputFocused = elRef;
    }
  }

  thisInputFocused(thisInput: any) {
    let entry = this.getInputEntry(thisInput);

    if (entry && this.inputFocused) {
      return this.inputFocused.nativeElement.id === thisInput.id;
    }

    return false;
  }

  /**
   * Is the currently focused input invalid?
   * @returns {boolean}
   */
  isErrorFocusedInput() {
    if (this.inputFocused) {
      let status = this.getStatusValueByElementRef(this.inputFocused);

      return status === 'invalid';
    }

    return false;
  }

}
