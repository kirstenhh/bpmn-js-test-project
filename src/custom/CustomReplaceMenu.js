import { isAny } from "bpmn-js/lib/features/modeling/util/ModelingUtil";

export default class CustomReplaceMenu {
  constructor(popupMenu, bpmnReplace) {
    popupMenu.registerProvider("bpmn-replace", this);
    this.replaceElement = bpmnReplace.replaceElement;
  }

  getPopupMenuHeaderEntries(element) {
    return function (entries) {
      return entries;
    };
  }

  getPopupMenuEntries(element) {
    const self = this;
    return function (entries) {
      //console.log(entries);
      //console.log(entries['replace-with-error-end']?.action.toString());
      if (isAny(element, ["bpmn:DataObjectReference"])) {
        entries = {
          ...entries,
          "replace-with-data-input": {
            label: "Data Input",
            className: "bpmn-icon-data-input",
            action: function () {
              return self.replaceElement(element, {
                type: "bpmn:DataInput"
              });
            }
          }
        };
      }
      return entries;
    };
  }
}

CustomReplaceMenu.$inject = ["popupMenu", "bpmnReplace"];