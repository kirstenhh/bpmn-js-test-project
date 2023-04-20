export default class CustomContextPad {
    constructor(config, contextPad, create, elementFactory, injector, translate) {
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
        create,
        elementFactory,
        translate
      } = this;
  
      function appendDataInput(event, element) {
        if (autoPlace) {
          const shape = elementFactory.createShape({ type: 'bpmn:DataInput' });
          autoPlace.append(element, shape);
        } else {
          appendDataInputStart(event, element);
        }
      }
  
      function appendDataInputStart(event) {

        const shape = elementFactory.createShape({ type: 'bpmn:ServiceTask' });
        create.start(event, shape, element);
      }
  
      return {
        'append.service-task': {
          group: 'model',
          className: 'bpmn-icon-data-input',
          title: translate('Append DataInput'),
          action: {
            click: appendDataInput,
            dragstart: appendDataInputStart
          }
        }
      };
    }
  }
  
  CustomContextPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate'
  ];
  