
import CustomContextPad from './CustomContextPad';
import CustomReplaceMenu from './CustomReplaceMenu';
import CustomRenderer from './CustomRenderer';

export default {
  __init__: [ 'customContextPad','customReplaceMenu','customRenderer' ],
  customContextPad: [ 'type', CustomContextPad ],
  customReplaceMenu: [ 'type', CustomReplaceMenu ],
  customRenderer: [ 'type', CustomRenderer ],
};