import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
    append as svgAppend,
    attr as svgAttr,
    create as svgCreate,
    remove as svgRemove
} from 'tiny-svg';

import iconCaseModel from '../resources/case-plan-model.svg'
import {
    getRoundRectPath
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import { is, isAny, getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
//import { is,isAny, getBusinessObject } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

const HIGH_PRIORITY = 1500,
    TASK_BORDER_RADIUS = 2;


export default class CustomRenderer extends BaseRenderer {
    constructor(eventBus, bpmnRenderer) {
        super(eventBus, HIGH_PRIORITY);

        this.bpmnRenderer = bpmnRenderer;
    }

    canRender(element) {
        return !element.labelTarget;
    }

    drawShape(parentNode, element) {
        const shape = this.bpmnRenderer.drawShape(parentNode, element);
        console.log(shape);
        if(is(element, 'bpmn:Task') && getBusinessObject(element).isCase){
            const rect = drawRect(parentNode, 30, 20, TASK_BORDER_RADIUS, '#FF00FF');
            //HOW DO WE LOAD THIS
            var caseIcon = `<g
            inkscape:label="Ebene 1"
            inkscape:groupmode="layer"
            id="layer1"
            transform="translate(0,947.63784)">
           <path
              id="path6729"
              style="opacity:1;fill:none;fill-opacity:0.28037385;stroke:#000000;stroke-width:100;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none"
              d="m 150,-297.63782 1049.5,0 -951.5,-2e-5 265.75001,-300 367.9108,0 277.83919,299.99998 690.5,0 0,1000.00002 -1700,0 z"
              inkscape:connector-curvature="0"
              sodipodi:nodetypes="cccccccccc" />
            </g>`
            // svgAttr(iconCaseModel, {
            //     transform:'translate(5,5)'
            // });
            svgAttr(rect, {
                transform: 'translate(5,5)'
            });
    
        }


        return shape;
    }

    getShapePath(shape) {
        if (is(shape, 'bpmn:Task')) {
            return getRoundRectPath(shape, TASK_BORDER_RADIUS);
        }

        return this.bpmnRenderer.getShapePath(shape);
    }

}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, color) {
    const rect = svgCreate('rect');
    svgAttr(rect, {
        width: width,
        height: height,
        rx: borderRadius,
        ry: borderRadius,
        stroke: color,
        strokeWidth: 2,
        fill: color
    });

    svgAppend(parentNode, rect);

    return rect;
}
