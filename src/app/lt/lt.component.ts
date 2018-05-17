import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ElementRef,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  isDevMode,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import {LtService} from '../services/lt.service';
import {LtInputComponent} from './lt-input/lt-input.component';
import {LtWordComponent} from './lt-word/lt-word.component';
import {LtHtmlElementComponent} from './lt-html-element/lt-html-element.component';
import {LtInputsService} from '../services/lt-inputs.service';

@Component({
  selector: 'app-lt',
  templateUrl: './lt.component.html',
  styleUrls: ['./lt.component.scss']
})
export class LtComponent implements OnInit, AfterViewChecked {

  /**
   * Our test.
   */
  test: any
  testForm: FormGroup

  testAllText: string = ''

  private expectedNInputs = 0

  private loaderRemoved = false

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

  @ViewChild('loader') loaderEltRef: ElementRef
  @ViewChild('formTag') formEltRef: ElementRef
  @ViewChild('formTag', {read: ViewContainerRef}) formEltViewRef: ViewContainerRef

  private ltInputFactory: any
  private ltWordFactory: any
  private ltHtmlEltFactory: any

  constructor(private ltService: LtService,
              private ltInputsSvc: LtInputsService,
              private cd: ChangeDetectorRef,
              private fb: FormBuilder,
              private factoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {

    this.getLt(lt => {
      this.test = lt.test
      this.testAllText = lt.allText
      this.buildForm()

      this.ltInputFactory = this.factoryResolver.resolveComponentFactory(LtInputComponent)
      this.ltWordFactory = this.factoryResolver.resolveComponentFactory(LtWordComponent)
      this.ltHtmlEltFactory = this.factoryResolver.resolveComponentFactory(LtHtmlElementComponent)

      // create wiki DOM element
      let wikiHTML = document.createElement('div')
      wikiHTML.innerHTML = this.testAllText

      // insert lt-input components
      this.insertLTComponents(wikiHTML, this.formEltViewRef)

      this.ltInputsSvc.init(this.ltSuccess, this.test, this.testForm, this.expectedNInputs)
    })
  }

  ngAfterViewChecked() {

    if (this.ltInputsSvc.isReady() && this.formEltRef) {
      setTimeout(() => { // loading the test takes minimum 2s - UX
        this.formEltRef.nativeElement.parentNode.classList.remove('invisible')
        this.formEltRef.nativeElement.parentNode.classList.add('visible')

        if (this.loaderEltRef && !this.loaderRemoved) {
          let loader = this.loaderEltRef.nativeElement
          loader.parentNode.removeChild(loader)
          this.loaderRemoved = true
        }
      }, 2000)
    }
  }

  /**
   * Create group controls with their validators:
   *  - required
   *  - a regex to match the right answer
   */
  private buildForm() {
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

  private static createComponent(factory: any, eltViewRef) {
    return factory.create(eltViewRef.parentInjector)
  }

  private insertLTComponents(rootElt, viewRef) {

    let nodes = rootElt.childNodes
    const
      ELEMENT_NODE = 1,
      ATTRIBUTE_NODE = 2,
      TEXT_NODE = 3,
      COMMENT_NODE = 8

    for (let c = 0; c < nodes.length; c++) {
      let node = nodes[c]

      if (node.localName === 'app-lt-input') {
        const ltCmp = LtComponent.createComponent(this.ltInputFactory, viewRef)
        ltCmp.instance.value = node.innerText
        ltCmp.instance.explanation = JSON.parse(node.attributes.explanation.value)
        ltCmp.instance.i = node.attributes.index.value
        viewRef.insert(ltCmp.hostView)

        this.expectedNInputs += 1
      }

      else if (node.nodeType === TEXT_NODE) {
        const ltCmp = LtComponent.createComponent(this.ltWordFactory, viewRef)
        ltCmp.instance.innerHTML = node.data
        viewRef.insert(ltCmp.hostView)
      }

      else if (node.nodeType === ELEMENT_NODE) {
        const ltCmp = LtComponent.createComponent(this.ltHtmlEltFactory, viewRef)

        ltCmp.instance.element = document.createElement(node.nodeName)
        viewRef.insert(ltCmp.hostView)
        this.insertLTComponents(node, ltCmp.instance.eltViewRef)
      }

      else if (node.nodeType === COMMENT_NODE && isDevMode())
        console.log('--- COMMENT NODE ---')

      else if (node.nodeType === ATTRIBUTE_NODE && isDevMode())
        console.log('--- ATTRIBUTE NODE ---')
    }
  }

  /**
   * Get lt test according to level and training chosen.
   */
  getLt(cb) {
    let error: string;

    if (this.isRandom) {
      this.ltService.getRandomLT()
        .then(cb);
    } else
      error = 'Level not available';

    if (error)
      this.loadTestError.emit({error: error})
  }

  /**
   * Percentage of inputs validated.
   * @returns {string}
   */
  successBarSize() {
    const barSize = (this.ltInputsSvc.getRightAnswersCnt() / this.ltInputsSvc.inputsLength()) * 100;
    if (`${barSize}` === 'NaN') {
      return '0%';
    }
    return `${barSize}%`;
  }

  isReady() {
    return this.ltInputsSvc.isReady()
  }

  getFlagColor() {
    return this.ltInputsSvc.getFlagColor();
  }

  getFlagIsAnswer() {
    return this.ltInputsSvc.getFlagIsAnswer()
  }

  getFlagExplanation() {
    return this.ltInputsSvc.getFlagExplanation()
  }

}
