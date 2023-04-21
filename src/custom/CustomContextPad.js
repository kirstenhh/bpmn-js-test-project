const SUITABILITY_SCORE_HIGH = 100,
      SUITABILITY_SCORE_AVERGE = 50,
      SUITABILITY_SCORE_LOW = 25;

export default class CustomContextPad {
  constructor(bpmnFactory, config, contextPad, create, elementFactory, injector, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const {
      autoPlace,
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this;

    function appendCaseTask() {
      return function(event, element) {
        if (autoPlace) {
          const businessObject = bpmnFactory.create('bpmn:Task');
          businessObject.isCase = true;
          businessObject.caseRef = 'default';
          const shape = elementFactory.createShape({
            type: 'bpmn:Task',
            businessObject: businessObject
          });
          autoPlace.append(element, shape);
        } else {
          appendCaseTaskStart(event, element);
        }
      };
    }

    function appendCaseTaskStart() {
      return function(event) {
        const businessObject = bpmnFactory.create('bpmn:Task');

        const shape = elementFactory.createShape({
          type: 'bpmn:Task',
          businessObject: businessObject
        });
        
        create.start(event, shape, element);
      };
    }

    return {
      'append.low-task': {
        group: 'model',
        className: 'cmmn-icon-case-plan-model red',
        title: translate('Append case task'),
        action: {
          click: appendCaseTask(),
          dragstart: appendCaseTaskStart()
        }
      }
    };
  }
}

CustomContextPad.$inject = [
  'bpmnFactory',
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate'
];