import {
  Component, OnInit, Output, EventEmitter, ViewChildren, AfterViewInit, Input, Renderer2, OnDestroy, QueryList,
  ElementRef
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
export class LtComponent implements OnInit, AfterViewInit, OnDestroy {

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
    const input = this.getInputEntry(thisInput);
    return input ? input.status === 'invalid' : false;
  }

  /**
   * When an input control
   *
   * @param thisInput the input child
   * @param index in the loop of words
   */
  controlChanged(thisInput: any, index: number) {

    const entryInput = this.getInputEntry(thisInput);

    if (entryInput.nativeElement.value.trim() !== '') {
      this.triesCnt++;
    }

    if (this.testForm.controls['test']['controls'][index].valid) {

      this.rightAnswersCnt++;

      entryInput.status = 'valid';

      try {
        this.renderer.setAttribute(entryInput.nativeElement, 'disabled', 'disabled');
      } catch (e) {
      }
    } else if (entryInput.nativeElement.value.trim() !== '') {
      entryInput.status = 'invalid';
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
    thisInput.nativeElement.focus();
    this.selectInput(thisInput);
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
    return this.inputChildren.find((obj) => {
      return obj.nativeElement.id === thisInput.id;
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
      if (arr[i - 1] && obj.status !== 'valid') {
        return arr[i - 1].nativeElement.id === thisInput.id;
      }
    });

    if (!e) {
      // we go to the first not valid
      e = this.inputChildren.find((obj) => {
        return obj.status === 'invalid';
      });
    }

    if (!e) {
      // we go to the first not valid
      e = this.inputChildren.find((obj) => {
        return obj.status !== 'valid';
      });
    }

    // we raise an error in case there's no entry left
    if (!e) {
      throw new Error('No entry left.');
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
    const input = this.getInputEntry(thisInput);
    const untouched = 'untouched';
    return input ? input.status ? input.status : untouched : untouched;
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
   * When input gets focus.
   * @param thisInput
   * @param explanation
   */
  onInputFocus(thisInput: any, explanation: string) {
    this.inputFocused = this.getInputEntry(thisInput);
    this.inputFocused.explanation = explanation;
  }

  /**
   * When user clicks on input:
   *  -> focus and select this input.
   * @param thisInput
   */
  onInputClick(thisInput: any) {
    this.focusInput(this.getInputEntry(thisInput));
  }

  /**
   * When tab is pressed:
   *  -> go to the next input.
   * @param event
   * @param thisInput
   */
  onInputTab(event: any, thisInput: any) {
    event.preventDefault();
    this.focusInput(this.findNextInvalidInputEntry(thisInput));
  }

  /**
   * Is the currently focused input invalid?
   * @returns {any|boolean}
   */
  isErrorFocusedInput() {
    return this.inputFocused && this.inputFocused.status && this.inputFocused.status === 'invalid';
  }

}
