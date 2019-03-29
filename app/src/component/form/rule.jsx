import {createRule} from "react-generic-form";

export default {
  string:{
    not:{
      empty:createRule(({value=""})=>value.length > 0)
    },
    len:{
      min:createRule(({value="", params:{size=0}})=>value.length >= size),
      max:createRule(({value="", params:{size=0}})=>value.length <= size)
    }
  }
};
