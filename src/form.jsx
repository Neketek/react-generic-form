import React, {cloneElement} from "react";
import Component from "./component";
import PropTypes from "prop-types";
import _ from "lodash";


const FormEvent=src=>{
  const {name, value, error, focus, visited} = _.cloneDeep(src);
  return {name, value, error, focus, visited};
}

const State=props=>{
  const {name, value={}, error={}, focus={}, visited={}} = props;
  return {
    name,
    value:_.cloneDeep(value),
    error:_.cloneDeep(error),
    focus:_.cloneDeep(focus),
    visited:_.cloneDeep(visited),
  }
}

const isValid=error=>{
  if(!error){
    return true;
  }
  if(error instanceof Array){
    return error.length == 0;
  }else if(error instanceof Object){
    for(const name in error){
      if(!isValid(error[name])){
        return false;
      }
    }
    return true;
  }
  return false;
}


class BaseForm extends Component{
  constructor(props){
    super(props);
    this.nestedRefs={}; // to call validation methods of nested forms
    this.state = State(props);

    this.onFieldChange=e=>{
      const state = _.cloneDeep(this.state);
      this.updateStateByFieldEvent({state,e});
      this.updateAndPropagate(state);
    }

    this.onFieldFocusChange=e=>{
      const state = _.cloneDeep(this.state);
      this.updateStateByFieldFocusEvent({state,e});
      this.updateAndPropagate(state);
    }

    this.onFormChange=e=>{
      const state = _.cloneDeep(this.state);
      this.updateStateByFormEvent({state,e});
      this.updateAndPropagate(state);
    }

    this.Form=props=>this.FormWrapper(props);

    this.Field=props=>this.FieldWrapper(props);

    this.Errors=props=>this.ErrorsWrapper(props);

  }

  componentDidMount(){
    const {props:{nested}} = this;
    if(nested){
      return;
    }
    const state = this.validate();
    this.updateAndPropagate(state);
  }

  static getDerivedStateFromProps(props, state){
    if(props.nested){
      return State(props);
    }
    return null;
  }


  fieldProps(name){
    const {
      state:{
        value
      },
      onFieldChange:onChange,
      onFieldFocusChange:onFocusChange
    } = this;

    return {
      value:value[name],
      onChange,
      onFocusChange,
      name,
    };
  }

  formProps(name){
    const {
      state:{
        value,
        error,
        focus,
        visited,
      },
      props:{
        special:{
          showErrors
        }
      },
      onFormChange:onChange
    } = this;

    let ref = this.nestedRefs[name];
    ref = ref?ref:React.createRef();
    this.nestedRefs[name] = ref;

    return {
      name,
      ref,
      nested:true,
      value:value[name],
      error:error[name],
      focus:focus[name],
      visited:visited[name],
      special:{
        showErrors,
      },
      onChange,
    };
  }

  errorsProps(name){
    const {
      state:{
        visited:{
          [name]:visited
        },
        error:{
          [name]:error
        },
        focus:{
          [name]:focus
        }
      }
    } = this;
    return {visited, focus, error};
  }

  FormWrapper(props){
    const {children:form} = props;
    return cloneElement(form, this.formProps(form.props.name));
  }

  FieldWrapper(props){
    const {children:field} = props;
    return cloneElement(field, this.fieldProps(field.props.name));
  }



  ErrorsWrapper(props){
    const {children:error} = props;
    return cloneElement(error, this.errorsProps(error.props.name));
  }

  updateAndPropagate(state){
    const {props:{nested, onChange}} = this;
    onChange(FormEvent(state));
    if(nested){
      return;
    }
    this.setState(state);
  }

  updateStateByFormEvent({state,e}){
    const {name, error, focus, value, visited} = e;
    state.value[name] = value;
    state.focus[name] = focus;
    state.error[name] = error;
    state.visited[name] = visited;
  }

  updateStateByFieldEvent({state,e}){
    const {name, value} = e;
    state.value[name] = value;
    this.fillFieldErrors({state, name, value});
  }

  updateStateByFieldFocusEvent({state,e}){
    const {name, focus} = e;
    state.focus[name] = focus;
    state.visited[name] = true;
    this.fillFieldErrors({name, state, value:state.value[name]});
  }

  fillFieldErrors({state, value, name}){
    const {props} = this;
    const rules = _.get(props.rule,name,[]);
    const errors = [];
    for(const rule of rules){
      const error = rule(value, props);
      if(error){
        errors.push(error);
      }
    }
    if(errors.length > 0){
      state.error[name] = errors;
    }else{
      state.error[name] = undefined;
    }
  }

  /*
  retun state object filled with error for all fields
  */

  validate(){
    const state = _.cloneDeep(this.state);
    const {nestedRefs, props:{rule:rules}} = this;
    for(const name in nestedRefs){
      const validatedState = nestedRefs[name].current.validate();
      this.updateStateByFormEvent({state,e:FormEvent(validatedState)});
    }
    for(const name in rules){
      const e = {name,value:state.value[name]};
      this.updateStateByFieldEvent({state,e});
    }
    return state;
  }

  form(){
    return null;
  }

  render(){
    return this.form();
  }
}

BaseForm.updatePropTypes({
  name:PropTypes.string.isRequired,
  value:PropTypes.object.isRequired,
  error:PropTypes.object.isRequired,
  focus:PropTypes.object.isRequired,
  visited:PropTypes.object.isRequired,
  rule:PropTypes.object.isRequired,
  special:PropTypes.shape({
    showErrors:PropTypes.bool,
  }),
  onChange:PropTypes.func.isRequired,
});

BaseForm.updateDefaultProps({
  name:"default",
  value:{},
  error:{},
  focus:{},
  visited:{},
  rule:{},
  special:{
    showErrors:false
  },
  onChange:e=>console.log(e)
});

export default BaseForm;
