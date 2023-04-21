
import customModule from './custom';
import ncExtension from './resources/ncmod.json';

import BpmnJS from 'bpmn-js/lib/Modeler';

import './index.css';

let modeler = new BpmnJS({
  container: '#canvas',
  additionalModules: [
    customModule
  ],
  keyboard: {
    bindTo: window
  },
  moddleExtensions: {
    nc: ncExtension
  }
});



const openDiagram = async (bpmnXML) => {
  try {
    if (bpmnXML) {
      await modeler.importXML(bpmnXML);
      console.log('imported')
      // access modeler components
      const canvas = modeler.get('canvas');
      // zoom to fit full viewport
      canvas.zoom('fit-viewport');
    }

  } catch (err) {

    console.error('could not import BPMN 2.0 diagram', err);
  }
};

var simple = `<?xml version="1.0" encoding="UTF-8"?>
  <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1s8m89i" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="2.2.4">
    <bpmn:process id="Process_1" isExecutable="true">
      <bpmn:startEvent id="StartEvent_1" />
    </bpmn:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
        <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
          <dc:Bounds x="173" y="102" width="36" height="36" />
        </bpmndi:BPMNShape>
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </bpmn:definitions>`;

openDiagram(simple);



function openFile() {
  const [file] = document.querySelector("#bpmnfile").files;
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      console.log(reader.result);
      openDiagram(reader.result);
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
}
document.querySelector("#bpmnfile").addEventListener("change", function (event) {
  openFile();
})

document.querySelector("#logger").addEventListener("click", function (event) {
  console.log(modeler);
  var elementRegistry = modeler.get('elementRegistry');
  var elems = [];
  elementRegistry.forEach(el => {
    console.log(el)
    if (el.element) {
      console.log(';')
      console.log(el.element)
    }
  });
  console.log(elems)
})