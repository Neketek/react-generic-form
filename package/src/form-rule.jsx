import _ from "lodash";


const createRule=(test)=>{

  if(!_.isFunction(test)){
    throw new Error("Test should be a function returning boolean");
  }

  return (message, params)=>{

    const context = {
      p:params
    };

    const rule = (function (value, props={},state={}){
      const {m:message, p:params={}} = this;
      return !test({value, params, props, state})?message({value, props, state, params}):null;
    }).bind(context);

    const messageSetter = (function(m){
      if(!_.isFunction(m)){
        throw new Error("Message should be a function returning boolean");
      }
      this.m=m;
      return rule;
    }).bind(context);

    const paramsSetter = (function(p){
      this.p=p;
      return rule;
    }).bind(context);


    rule.message=messageSetter;
    context.message=messageSetter;

    rule.params=paramsSetter;
    context.params=paramsSetter;


    if(message){
      rule.message(message);
    }

    return rule;
  };

}


export default createRule;
