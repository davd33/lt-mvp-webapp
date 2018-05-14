import {
  Component, OnInit, Output, EventEmitter, ViewChildren,
  Input, Renderer2, OnDestroy, AfterViewChecked, ElementRef, QueryList,
  ComponentFactoryResolver, ViewChild, ViewContainerRef
} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import {LtService} from '../services/lt.service';
import {LangService} from '../services/lang.service';
import {LtInputComponent} from './lt-input/lt-input.component';

@Component({
  selector: 'app-lt',
  templateUrl: './lt.component.html',
  styleUrls: ['./lt.component.scss']
})
export class LtComponent implements OnInit, AfterViewChecked, OnDestroy {

  /**
   * Our test.
   */
  test: any;

  testAllText: string;
  testAllTextAppended = false;

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
   * Color of the flag displaying messages and errors.
   * @type {string}
   */
  flagColor = 'green';

  /**
   * Basic flag explanation.
   * @type {string}
   */
  defaultFlagExplanation: {};

  /**
   * Flag explanation value.
   * @type {string}
   */
  flagExplanation: {};

  /**
   * Is the flag gonna display an answer or the commands?
   */
  flagIsAnswer: boolean;

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
  shakeInterval: any;

  /**
   * Object containing meta info of input children:
   * [{
   *  status, explanation
   * }]
   */
  inputObj: any[] = [];

  /**
   * Inputs for focus.
   */
  @ViewChildren('thisInput') inputChildren: QueryList<ElementRef>;

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
   * If the LT should be randomly pulled from the store.
   */
  @Input() isRandom: boolean;

  @ViewChild('formTag') formEltRef: ElementRef;
  @ViewChild('formTag', {read: ViewContainerRef}) formEltViewRef: ViewContainerRef

  private ltInputList: any;

  constructor(private renderer: Renderer2,
              private ltService: LtService,
              private lang: LangService,
              private fb: FormBuilder,
              private factoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.getLt();

    this.defaultFlagExplanation = {info: this.lang.text.Lt.flagExplanation};
    this.flagExplanation = this.defaultFlagExplanation;
    this.flagIsAnswer = false;

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

  ngAfterViewChecked() {

    // this.inputChildren.forEach((obj) => {
    //   if (!this.inputObj[obj.nativeElement.id]) {
    //     this.inputObj[obj.nativeElement.id] = {
    //       status: 'untouched',
    //       explanation: this.defaultFlagExplanation
    //     };
    //   }
    // });
    //
    // if (!this.inputFocused) {
    //   this.focusInput(this.inputChildren.first, ``);
    // }

    const ltInputFactory = this.factoryResolver.resolveComponentFactory(LtInputComponent)

    if (this.formEltRef && !this.testAllTextAppended) {

      // create wiki DOM element
      let wikiHTML = document.createElement('div')
      wikiHTML.innerHTML = this.testAllText

      // insert wiki page
      this.formEltRef.nativeElement.appendChild(wikiHTML)
      console.log(this.formEltRef)

      // find lt-input elements
      this.ltInputList = this.searchAppLTInput(wikiHTML, [])

      // insert lt-input components
      this.ltInputList.forEach(ltInput => {
        let parent = ltInput.parentElement

        const ltInputCmp = ltInputFactory.create(this.formEltViewRef.parentInjector)
        this.formEltViewRef.insert(ltInputCmp.hostView)

        ltInput.parentNode.removeChild(ltInput)
      })

      this.testAllTextAppended = true
    }
  }

  searchAppLTInput(rootElt, ltInputList) {
    let nodes = rootElt.childNodes

    for (let c = 0; c < nodes.length; c++) {
      let node = nodes[c]
      if (node.localName === 'app-lt-input') {
        ltInputList.push(node)
      } else {
        this.searchAppLTInput(node, ltInputList)
      }
    }

    return ltInputList
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
   * Get lt test according to level and training chosen.
   */
  getLt() {
    let error: string;

    if (!this.level || !this.training) {
      if (this.isRandom) {
        this.ltService.getRandomLT()
          .then(lt => {
            this.test = lt.test;
            this.testAllText = lt.allText;
            this.buildForm();
          });
      }
    } else if (this.level === 'A2') {
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

  isInputValid(thisInput: any) {
    const status = this.getStatusValue(thisInput);

    if (status) {
      return 'valid' === status;
    } else {
      return false;
    }
  }

  isInputInvalid(thisInput: any) {
    const status = this.getStatusValue(thisInput);

    if (status) {
      return 'invalid' === status;
    } else {
      return false;
    }
  }

  /**
   * Navigate to the next or the previous input when
   * tab key is down.
   *
   * @param event
   * @param thisInput
   */
  navigate(event: any, thisInput: any) {
    if (event.key === 'Tab') {
      event.preventDefault();
      const nextInput = event.shiftKey ? this.findPreviousInvalidInputEntry(thisInput) : this.findNextInvalidInputEntry(thisInput);
      this.focusInput(nextInput, this.getExplanationByElementRef(nextInput));
    }
  }

  /**
   * When an input control
   *
   * @param event
   * @param thisInput the input child
   * @param index in the loop of words
   * @param explanation
   */
  controlChanged(event: any, thisInput: any, index: number, explanation: string) {
    event.preventDefault();

    const entryInput = this.getInputEntry(thisInput);

    this.blurInput(thisInput);

    // save explanation entry
    if (this.getExplanation(thisInput) === this.defaultFlagExplanation) {
      this.setExplanation(thisInput, explanation);
    }

    // count user tries
    if (entryInput.nativeElement.value.trim() !== '') {
      this.triesCnt++;
    }

    if (this.testForm.controls['test']['controls'][index].valid) { // user hit

      // count user hits
      this.rightAnswersCnt++;

      this.setStatusValue(thisInput, 'valid');

      try {
        this.renderer.setAttribute(entryInput.nativeElement, 'readonly', '');
      } catch (e) {
      }
    } else if (entryInput.nativeElement.value.trim() !== '') { // user fail
      this.setStatusValue(thisInput, 'invalid');
    }

    // navigate to next invalid input
    try {
      const nextInput = this.findNextInvalidInputEntry(thisInput);

      this.focusInput(nextInput, this.getExplanationByElementRef(nextInput));
    } catch (e) {
    }

    // global test success
    if (this.testForm.valid) {
      setTimeout(() => {
        this.ltSuccess.emit({status: 'valid'});
      }, 500);
      /* wait animation of success bar .5s */
    }

    this.setChangedStatus(entryInput, false);
  }

  /**
   * Focus the native element of the parameter
   * and call selectInput.
   * @param elRef
   * @param explanation
   */
  focusInput(elRef: ElementRef, explanation: string) {
    if (elRef) {
      elRef.nativeElement.focus();
      this.setInputFocused(elRef, explanation);
      this.selectInput(elRef);
      this.changeFlagExplanation();
    }
  }

  /**
   * Display explanation for given input.
   * @param elRef
   * @param explanation
   */
  focusValidInput(elRef: ElementRef, explanation: string) {
    if (elRef) {
      this.setInputFocused(elRef, explanation);
      this.changeFlagExplanation();
    }
  }

  /**
   * Select text inside an input element.
   * @param elRef ViewChild variable
   */
  selectInput(elRef: ElementRef) {
    elRef.nativeElement.select();
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
      return this.inputObj[elRef.nativeElement.id].status;
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
      this.inputObj[elRef.nativeElement.id].status = newValue;
    }
  }

  setChangedStatus(thisInput: any, newValue: boolean) {
    this.setChangedStatusByElementRef(this.getInputEntry(thisInput), newValue);
  }

  /**
   * Set the change status of the current input.
   * If user has changed the value then the status is 'true'.
   * @param elRef
   * @param newValue
   */
  setChangedStatusByElementRef(elRef: ElementRef, newValue: boolean) {
    if (elRef) {
      this.inputObj[elRef.nativeElement.id].changed = newValue;
    }
  }

  getChangedStatus(thisInput: any) {
    this.getChangedStatusByElementRef(this.getInputEntry(thisInput));
  }

  getChangedStatusByElementRef(elRef: ElementRef) {
    if (elRef) {
      return this.inputObj[elRef.nativeElement.id].changed;
    }
  }

  getExplanation(thisInput: any) {
    return this.getExplanationByElementRef(this.getInputEntry(thisInput));
  }

  getExplanationByElementRef(elRef: ElementRef) {
    if (elRef) {
      return this.inputObj[elRef.nativeElement.id].explanation;
    }
  }

  setExplanation(thisInput: any, newValue: string) {
    this.setExplanationByElementRef(this.getInputEntry(thisInput), newValue);
  }

  setExplanationByElementRef(elRef: ElementRef, newValue: string) {
    if (elRef) {
      this.inputObj[elRef.nativeElement.id].explanation = newValue;
    }
  }

  isLastInputChild(thisInput: any) {
    return thisInput.id === this.inputChildren.last.nativeElement.id;
  }

  isFirstInputChild(thisInput: any) {
    return thisInput.id === this.inputChildren.first.nativeElement.id;
  }

  /**
   * Finds the next input not yet validated by the user.
   *
   * @param thisInput
   * @returns any
   */
  findNextInvalidInputEntry(thisInput: any): any {

    const e: any = this.inputChildren.find((obj) => {
      const status = this.getStatusValueByElementRef(obj);

      const sameInput = obj.nativeElement.id === thisInput.id;
      const greaterId = (!this.isLastInputChild(thisInput)) ? obj.nativeElement.id > thisInput.id : true;

      return status !== 'valid' && !sameInput && greaterId;
    });

    return e;
  }

  /**
   * Finds the previous input not yet validated by the user.
   *
   * @param thisInput
   */
  findPreviousInvalidInputEntry(thisInput: any): any {

    const inputs = this.inputChildren.toArray().reverse();
    const e: any = inputs.find((obj) => {
      const status = this.getStatusValueByElementRef(obj);

      const sameInput = obj.nativeElement.id === thisInput.id;
      const lowerId = (!this.isFirstInputChild(thisInput)) ? obj.nativeElement.id < thisInput.id : true;

      return status !== 'valid' && !sameInput && lowerId;
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
      return 'untouched';
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

  insertHTMLString(that, value) {
    // w.isInput ? this.innerHTML : this.innerHTML + w.value
    let parent = that.parentNode;
    let helper = document.createElement('div');
    helper.innerHTML = value;
    while (helper.firstChild) {
      parent.insertBefore(helper.firstChild, that);
    }
  }

  /**
   * When user clicks on input:
   *  -> focus and select this input.
   * @param thisInput
   * @param explanation
   */
  onInputClick(thisInput: any, explanation: string) {
    const status = this.getStatusValue(thisInput);

    if ('valid' === status) {
      this.focusValidInput(this.getInputEntry(thisInput), explanation);
    } else {
      this.focusInput(this.getInputEntry(thisInput), explanation);
    }
  }

  blurInput(thisInput: any) {
    this.inputFocused.blured = true;
  }

  setInputFocused(elRef: ElementRef, explanation: string) {
    if (elRef) {
      this.inputFocused = elRef;
      this.inputFocused.blured = false;
      this.inputFocused.explanation = explanation;
    }
  }

  getFlagColor() {
    return this.flagColor;
  }

  changeFlagExplanation() {
    const status = this.getStatusValueByElementRef(this.inputFocused);

    if (this.inputFocused && status === 'invalid') {
      this.flagColor = 'red';
      this.flagIsAnswer = true;
      this.flagExplanation = this.inputFocused.explanation;
    } else if (this.inputFocused && status === 'valid') {
      this.flagColor = 'green';
      this.flagIsAnswer = true;
      this.flagExplanation = this.inputFocused.explanation;
    } else {
      this.flagColor = 'green';
      this.flagIsAnswer = false;
      this.flagExplanation = this.defaultFlagExplanation;
    }
  }

}
