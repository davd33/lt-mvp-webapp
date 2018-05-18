import {ElementRef, EventEmitter, Injectable, Renderer2} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {LangService} from './lang.service';

@Injectable()
export class LtInputsService {

  /**
   * Event emitted when lucken text is successfully filled.
   */
  private ltSuccess

  private ready = false
  private initiated = false
  private inputsReady = false

  private inputs: ElementRef[] = []

  private expectedNInputs: number

  private test: any

  /**
   * The currently focused input.
   */
  private inputFocused: any;

  /**
   * Object containing meta info of input children:
   * [{
   *  status, explanation
   * }]
   */
  private inputObj: any = {};

  /**
   * Counter of tries: a try is counted when the user
   * press enter to validate his answer on an input.
   */
  private triesCnt = 0;

  /**
   * Counter of the number of right answers.
   */
  private rightAnswersCnt = 0;

  /**
   * Basic flag explanation.
   * @type {string}
   */
  private defaultFlagExplanation: {};

  /**
   * Color of the flag displaying messages and errors.
   * @type {string}
   */
  private flagColor = 'green';

  /**
   * Flag explanation value.
   * @type {string}
   */
  private flagExplanation: {};

  /**
   * Is the flag gonna display an answer or the commands?
   */
  private flagIsAnswer: boolean;

  /**
   * Form group for the test.
   */
  private testForm: FormGroup;

  constructor(private lang: LangService) {
  }

  private blurInput(input: any) {
    this.inputFocused.blured = true;
  }

  /**
   * Get the input entry ElementRef from the inputs.
   * @param input
   */
  private getInputEntry(input: any) {
    if (input) {
      return this.inputs.find((obj) => {
        return obj.nativeElement.id === input.id;
      });
    }
  }

  private getExplanation(input: any) {
    return this.getExplanationByElementRef(this.getInputEntry(input));
  }

  private getExplanationByElementRef(elRef: ElementRef) {
    if (elRef) {
      return this.inputObj[elRef.nativeElement.id].explanation;
    }
  }

  private setExplanation(input: any, newValue: string) {
    this.setExplanationByElementRef(this.getInputEntry(input), newValue);
  }

  private setExplanationByElementRef(elRef: ElementRef, newValue: string) {
    if (elRef) {
      this.inputObj[elRef.nativeElement.id].explanation = newValue;
    }
  }

  /**
   * Get the status of the input:
   *  - untouched,
   *  - valid,
   *  - invalid.
   * @param input
   * @returns {any}
   */
  private getStatusValue(input: any) {
    return this.getStatusValueByElementRef(this.getInputEntry(input));
  }

  private getStatusValueByElementRef(elRef: ElementRef) {
    if (elRef) {
      return this.inputObj[elRef.nativeElement.id].status;
    }
  }

  /**
   * Set the status of the input:
   *  - untouched,
   *  - valid,
   *  - invalid.
   * @param input
   * @param newValue
   */
  private setStatusValue(input: any, newValue: string) {
    this.setStatusValueByElementRef(this.getInputEntry(input), newValue);
  }

  private setStatusValueByElementRef(elRef: ElementRef, newValue: string) {
    if (elRef) {
      this.inputObj[elRef.nativeElement.id].status = newValue;
    }
  }

  private getChangedStatus(input: any) {
    this.getChangedStatusByElementRef(this.getInputEntry(input));
  }

  private getChangedStatusByElementRef(elRef: ElementRef) {
    if (elRef) {
      return this.inputObj[elRef.nativeElement.id].changed;
    }
  }

  /**
   * Set the change status of the current input.
   * If user has changed the value then the status is 'true'.
   * @param input
   * @param newValue
   */
  private setChangedStatus(input: any, newValue: boolean) {
    this.setChangedStatusByElementRef(this.getInputEntry(input), newValue);
  }

  private setChangedStatusByElementRef(elRef: ElementRef, newValue: boolean) {
    if (elRef) {
      this.inputObj[elRef.nativeElement.id].changed = newValue;
    }
  }

  /**
   * Focus the native element of the parameter
   * and call selectInput.
   * @param elRef
   * @param explanation
   */
  private focusInput(elRef: ElementRef, explanation: string) {
    if (elRef) {
      elRef.nativeElement.focus();
      this.setInputFocused(elRef, explanation);
      this.selectInput(elRef);
      this.changeFlagExplanation();
    }
  }

  private setInputFocused(elRef: ElementRef, explanation: string) {
    if (elRef) {
      this.inputFocused = elRef;
      this.inputFocused.blured = false;
      this.inputFocused.explanation = explanation;
    }
  }

  /**
   * Select text inside an input element.
   * @param elRef ViewChild variable
   */
  private selectInput(elRef: ElementRef) {
    elRef.nativeElement.select();
  }

  private changeFlagExplanation() {
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

  /**
   * Finds the next input not yet validated by the user.
   *
   * @param input
   * @returns any
   */
  private findNextInvalidInputEntry(input: any): any {

    const e: any = this.inputs.find((obj) => {
      const status = this.getStatusValueByElementRef(obj);

      const sameInput = obj.nativeElement.id === input.id;
      const greaterId =
        (!this.isLastInputChild(input)) ?
          parseInt(obj.nativeElement.id) === (parseInt(input.id)+2) :
          true

      return status !== 'valid' && !sameInput && greaterId;
    });

    return e;
  }

  /**
   * Finds the previous input not yet validated by the user.
   *
   * @param input
   */
  private findPreviousInvalidInputEntry(input: any): any {

    const inputs = this.inputs.reverse();
    const e: any = inputs.find((obj) => {
      const status = this.getStatusValueByElementRef(obj);

      const sameInput = obj.nativeElement.id === input.id;
      const lowerId =
        (!this.isFirstInputChild(input)) ?
          parseInt(obj.nativeElement.id) === (parseInt(input.id) - 2) :
          true;

      return status !== 'valid' && !sameInput && lowerId;
    });

    return e;
  }

  private isFirstInputChild(thisInput: any) {
    return thisInput.id === this.inputs[0].nativeElement.id;
  }

  private isLastInputChild(input: any) {
    return input.id === this.inputs[this.inputs.length - 1].nativeElement.id;
  }

  /**
   * Display explanation for given input.
   * @param elRef
   * @param explanation
   */
  private focusValidInput(elRef: ElementRef, explanation: string) {
    if (elRef) {
      this.setInputFocused(elRef, explanation);
      this.changeFlagExplanation();
    }
  }

  private initInputFocused() {
    if (!this.inputFocused) {
      this.focusInput(this.inputs[0], ``);
    }
  }

  private createInputObjects() {

    if (!this.ready) {
      this.ready = true

      this.inputs.forEach((obj) => {
        if (!this.inputObj[obj.nativeElement.id]) {
          this.inputObj[obj.nativeElement.id] = {
            status: 'untouched',
            explanation: this.defaultFlagExplanation
          }
        }
      })
    }
  }

  /**
   * Check whether the LT has been completed in which case
   * the LT Success event will be emitted with the object:
   * {status: 'valid'}
   *
   * @param event
   * @param input
   * @param {number} index
   * @param {string} explanation
   * @param {Renderer2} renderer
   */
  public controlChanged(
    event: any,
    input: any,
    index: number,
    explanation: string,
    renderer: Renderer2) {

    if (!this.ltSuccess) throw new Error('LT Success event missing!')

    event.preventDefault();

    const entryInput = this.getInputEntry(input);

    this.blurInput(input);

    // save explanation entry
    if (this.getExplanation(input) === this.defaultFlagExplanation) {
      this.setExplanation(input, explanation);
    }

    // count user tries
    if (entryInput.nativeElement.value.trim() !== '') {
      this.triesCnt++;
    }

    if (this.testForm.controls[index].valid) { // user hit

      // count user hits
      this.rightAnswersCnt++;

      this.setStatusValue(input, 'valid');

      try {
        renderer.setAttribute(entryInput.nativeElement, 'readonly', '');
        renderer.setAttribute(entryInput.nativeElement, 'disabled', 'disabled');
      } catch (e) {
      }
    } else if (entryInput.nativeElement.value.trim() !== '') { // user fail
      this.setStatusValue(input, 'invalid');
    }

    // navigate to next invalid input
    try {
      const nextInput = this.findNextInvalidInputEntry(input);

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
   * Navigate to the next or the previous input when
   * tab key is down.
   *
   * @param event
   * @param thisInput
   */
  public navigate(event: any, input: any) {

    if (event.key === 'Tab') {
      event.preventDefault();
      const nextInput = event.shiftKey ?
        this.findPreviousInvalidInputEntry(input) :
        this.findNextInvalidInputEntry(input);
      this.focusInput(nextInput, this.getExplanationByElementRef(nextInput));
    }
  }

  /**
   * When user clicks on input:
   *  -> focus and select this input.
   * @param input
   * @param explanation
   */
  public onInputClick(input: any, explanation: any) {

    const status = this.getStatusValue(input);

    if ('valid' === status) {
      this.focusValidInput(this.getInputEntry(input), explanation);
    } else {
      this.focusInput(this.getInputEntry(input), explanation);
    }
  }

  public isInputInvalid(input: any) {
    const status = this.getStatusValue(input);

    if (status) {
      return 'invalid' === status;
    } else {
      return false;
    }
  }

  public isInputValid(input: any) {
    const status = this.getStatusValue(input);

    if (status) {
      return 'valid' === status;
    } else {
      return false;
    }
  }

  /**
   * Animation status for an input.
   * When 'valid' triggers 'hole' animation.
   *
   * @param input the input child
   * @returns {string}
   */
  public luckenInputStatus(input: any) {
    const status = this.getStatusValue(input);

    if (status) {
      return status;
    } else {
      return 'untouched';
    }
  }

  public getFlagColor() {
    return this.flagColor;
  }

  public getFlagIsAnswer() {
    return this.flagIsAnswer
  }

  public getFlagExplanation() {
    return this.flagExplanation
  }

  public inputsLength() {
    return this.inputs.length
  }

  public getRightAnswersCnt() {
    return this.rightAnswersCnt
  }

  public addInput(input: ElementRef) {

    this.inputs.push(input)

    if (!this.areInputsReady() && this.isInitiated() && this.expectedNInputs === this.inputsLength())
      this.inputsReady = true
  }

  public isReady() {
    return this.ready
  }

  public isInitiated() {
    return this.initiated
  }

  public areInputsReady() {
    return this.inputsReady
  }

  public markReady() {
    (() => {
      if (!this.ready) {
        this.createInputObjects()
      }
    })()
  }

  public destroy() {
    this.ltSuccess = undefined
    this.ready = false
    this.initiated = false
    this.inputsReady = false
    this.inputs = []
    this.expectedNInputs = undefined
    this.test = undefined
    this.inputFocused = undefined
    this.inputObj = {}
    this.triesCnt = 0
    this.rightAnswersCnt = 0
    this.defaultFlagExplanation = undefined
    this.flagColor = 'green'
    this.flagExplanation = undefined
    this.flagIsAnswer = undefined
    this.testForm = undefined
  }

  public init(
    successEvent: EventEmitter<any>,
    test: any,
    testForm: FormGroup,
    expectedNInputs: number) {

    this.test = test
    this.testForm = testForm
    this.ltSuccess = successEvent

    this.defaultFlagExplanation = {info: this.lang.text.Lt.flagExplanation}
    this.flagExplanation = this.defaultFlagExplanation
    this.flagIsAnswer = false

    this.expectedNInputs = expectedNInputs

    this.initInputFocused()

    this.initiated = true
  }
}
