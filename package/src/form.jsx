import React, {cloneElement} from "react";
import Component from "./component";
import PropTypes from "prop-types";
import _ from "lodash";


const FORM = Symbol("FORM");


// Form even builder
const FormEvent=src=>{
  const {name, value, error, warning, focus, visited} = _.cloneDeep(src);
  return {name, value, error, focus, warning, visited};
}
// Form props->state builder
const State=props=>{
  const {name, value={}, error={}, focus={}, visited={}, warning={}} = props;
  const state = {
    name,
    value:_.cloneDeep(value),
    error:_.cloneDeep(error),
    warning:_.cloneDeep(warning),
    focus:_.cloneDeep(focus),
    visited:_.cloneDeep(visited),
  }
  state.warning[FORM] = true;
  state.error[FORM] = true;
  return state;
}


class Form extends Component{
  constructor(props){
    super(props);
    this.nestedRefs={}; // to call validation methods of nested forms
    this.state = State(props);
    // Field change callbacks this binding
    this.onFieldChange=this.onFieldChange.bind(this);
    this.onFieldFocusChange=this.onFieldFocusChange.bind(this);
    // Nested form change callback this binding
    this.onFormChange=this.onFormChange.bind(this);
    // Field, nested forms and errors wrappers this binding
    this.Form=this.FormWrapper.bind(this);
    this.Field=this.FieldWrapper.bind(this);
    this.Errors=this.ErrorsWrapper.bind(this);

  }
  // If form is top level form after mount it will validate itself
  // and fire FormEvent
  // othervise it will wait parent form validation call
  componentDidMount(){
    const {props:{nested}} = this;
    if(nested){
      return;
    }
    const state = this.validate();
    this.updateAndPropagate(state);
  }
  // Nested form change handler
  onFormChange(e){
    const state = _.cloneDeep(this.state);
    this.updateStateByFormEvent({state,e});
    this.updateAndPropagate(state);
  }
  // Field/Input value change handler
  onFieldChange(e){
    const state = _.cloneDeep(this.state);
    this.updateStateByFieldEvent({state,e});
    this.updateAndPropagate(state);
  }
  // Field/Input focus change handler
  onFieldFocusChange(e){
    const state = _.cloneDeep(this.state);
    this.updateStateByFieldFocusEvent({state,e});
    this.updateAndPropagate(state);
  }
  // Functional wrapper component which adds standard
  // form props + automatically set props.nested=true to make form
  // act as functional component
  FormWrapper(props){
    const {children:form} = props;
    return cloneElement(form, this.formProps(form.props.name));
  }
  // Functional wrapper component which adds standard field/input props
  FieldWrapper(props){
    const {children:field} = props;
    return cloneElement(field, this.fieldProps(field.props.name));
  }
  // Functional wrapper component which adds standard field error props
  ErrorsWrapper(props){
    const {children:error} = props;
    return cloneElement(error, this.errorsProps(error.props.name));
  }
  // Functional wrapper component which adds standard field warning props
  WarningsWrapper(props){
    const {children:error} = props;
    return cloneElement(error, this.errorsProps(error.props.name));
  }
  // used to make nested form act as simple field
  static getDerivedStateFromProps(props, state){
    if(props.nested){
      return State(props);
    }
    return null;
  }
  // creates default field props based on field name
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
  // creates default nested form props and adds ref to nested form
  formProps(name){
    const {
      state:{
        value,
        error,
        warning,
        focus,
        visited,
      },
      props:{
        special:{
          showErrors,
          showWarnings
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
      warning:warning[name],
      focus:focus[name],
      visited:visited[name],
      special:{
        showErrors,
        showWarnings
      },
      onChange,
    };
  }
  // returns common props required for errors display
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
      },
      props:{
        special:{
          showErrors:show
        }
      }
    } = this;
    return {visited, focus, error, show};
  }
  // returns common props required for warnings display
  warningProps(name){
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
      },
      props:{
        special:{
          showWarnings:show
        }
      }
    } = this;
    return {visited, focus, error, show};
  }
  // sends new form state to parent component by onChange callback
  // updates form if it's not nested
  updateAndPropagate(state){
    const {props:{nested, onChange}} = this;
    onChange(FormEvent(state));
    if(nested){
      return;
    }
    this.setState(state);
  }
  // update state by nested form event
  updateStateByFormEvent({state,e}){
    const {name, error, focus, value, visited, warning} = e;

    state.value[name] = value;
    state.focus[name] = focus;
    state.visited[name] = visited;

    state.error[name] = error;
    state.warning[name] = warning;

  }
  // update state by standard field event
  updateStateByFieldEvent({state,e}){
    const {name, value} = e;
    state.value[name] = value;
    this.validateField({state, name, value});
  }
  // update state by standard field focus event
  updateStateByFieldFocusEvent({state,e}){
    const {name, focus} = e;
    state.focus[name] = focus;
    state.visited[name] = true;
    this.validateField({name, state, value:state.value[name]});
  }

  // Helper method which checks field errors using avaialble rules

  validateFieldByRules({name ,value, rules, props, state}){
    const errors = [];
    for(const rule of rules){
      const error = rule(name, value, props, state);
      if(error){
        errors.push(error);
      }
    }
    if(errors.length > 0){
      return errors;
    }
  }

  validateFieldByErrors({name, value, props, state}){
    const rules = _.get(props.rule.error, name, []);
    state.error[name] = this.validateFieldByRules({name, value, rules, props, state});
  }

  validateFieldByWarnings({name, value, props, state}){
    const rules = _.get(props.rule.warning, name, []);
    state.warning[name] = this.validateFieldByRules({name,value, rules, props, state});
  }

  validateField({state, value, name}){
    const {props} = this;
    this.validateFieldByWarnings({name, value, state, props});
    this.validateFieldByErrors({name, value, state, props});
  }

  // return state object filled with error for all fields
  validate(){
    const state = _.cloneDeep(this.state);
    const {nestedRefs, props} = this;

    for(const name in nestedRefs){
      const validatedState = nestedRefs[name].current.validate();
      this.updateStateByFormEvent({state, e:FormEvent(validatedState)});
    }

    for(const name in props.rule.error){
      this.validateFieldByErrors({name, value:state.value[name], props, state});
    }
    for(const name in props.rule.warning){
      this.validateFieldByWarnings({name, value:state.value[name], props, state});
    }

    return state;
  }

  // This is recursive error checker
  // It may be used check if form is valid, by going through
  // form.state.errors object
  static isValid(error){
    if(!error){
      return true;
    }
    // it checks error object FORM key because it determines form errors objects
    if(error[FORM]){
      for(const name in error){
        if(!isValid(error[name])){
          return false;
        }
      }
      return true;
    }else{
      return error.length == 0;
    }
    return false;
  }

  // form render method, just to be able to customize its args
  form(){
    return undefined;
  }
  // actual render method
  render(){
    return this.form();
  }
}

Form.updatePropTypes({
  // the most important prop because it allows form to be nested
  // as complex field
  name:PropTypes.string.isRequired,
  // contains all form field values
  value:PropTypes.object.isRequired,
  // contains arrays of field errors and nested forms error object
  error:PropTypes.object.isRequired,
  // same thing as errors prop but does not affect validity
  warning:PropTypes.object.isRequired,
  // contains focus state of fiels and nested forms
  focus:PropTypes.object.isRequired,
  // contains visited state of fiels and nested forms
  visited:PropTypes.object.isRequired,
  // form field validation rules
  rule:PropTypes.shape({
    // contains rules in format [fieldName]:[rule()]
    // note, that it always should be array
    warning:PropTypes.object.isRequired,
    error:PropTypes.object.isRequired
  }),
  special:PropTypes.shape({
    // just a flag which is also provided to all nested forms
    showWarnings:PropTypes.bool.isRequired,
    // same thing but for errors
    showErrors:PropTypes.bool.isRequired
  }).isRequired,
  // form change handler
  onChange:PropTypes.func.isRequired,
});

Form.updateDefaultProps({
  name:"default",
  value:{},
  focus:{},
  visited:{},
  error:{},
  warning:{},
  rule:{
    error:{},
    warning:{}
  },
  special:{
    showErrors:false,
    showWarnings:false
  },
  onChange:e=>console.log(e)
});

Form.symbol = {
  FORM
}

export default Form;
