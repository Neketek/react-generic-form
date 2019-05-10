import _ from "lodash";


const createRule=(test)=>{

  if(!_.isFunction(test)){
    throw new Error("Test should be a function returning boolean");
  }

  return (message, params)=>{

    const context = {
      p:params,
      e:true
    };

    const rule = (function (name, value, props={},state={}){
      const {m:message, p:params={}, e:expect} = this;
      return !expect == test({name, value, params, props, state})?message({name, value, props, state, params}):null;
    }).bind(context);

    const not = (function(){
      this.e=!this.e;
      return rule;
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
    rule.m=messageSetter;
    context.message=messageSetter;

    rule.params=paramsSetter;
    rule.p=paramsSetter;
    context.params=paramsSetter;

    rule.not=not;
    context.not=not;


    if(message){
      rule.message(message);
    }

    return rule;
  };

}


export default createRule;
