// That's a part where reusable field validation rules
// are created.

import {createRule} from "react-generic-form";
export default {
  string:{
    // To create rule you must provide test function which
    // can use set of parameters to verify validity of the value
    // function below contains all avaialble parameters
    // It's good practice to provide default values to
    // arguments which are used by test function

    // then when rule created it can be configured in two ways
    // first ways is siply calling rule(({name, value, params, props, state})=>``, {})
    // this way you provide message builder function which allow customization of the error
    // message depending on the set of parameters which builder receives. Second argument is
    // params object.
    // Second way is pretty similar. You call rule().message(()=>"message").params({}),
    // message and params are setters which return rule function, so order doesn't matter
    empty:createRule(({name, value="", params, props, state})=>value.length == 0),
    len:{
      min:createRule(({value="", params:{size=0}})=>value.length >= size),
      max:createRule(({value="", params:{size=0}})=>value.length <= size)
    }
  }
};
