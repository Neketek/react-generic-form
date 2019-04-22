# README

### What is this package?

This package is a nice little tool designed to provide a good way to generalize forms data and their basic interactions.

### Why is necessary?

Quite a while ago I was leading development of an ambitious web project which used React in the front end. I quickly found that the creation of the forms is way too repetitive. Basically, most of the time developers were doing the same thing. They were manually creating the form state and data structure, in addition, they were trying to implement complex behavior using callbacks and chaotically placed state fields.  Therefore I made a small tool which simplified their lives a lot.  And now I want to share it with the world.

### Concept
There are several key concepts which I kinda force to follow.
1. Input generalization
2. Form generalization
3. Data generalization
4. Forms nesting
5. Form validation rules customization
6. Usage of the inheritance for behavior customization

#### Input generalization
BaseInput is simple class which provides general interface for various form inputs.  Interface itself is pretty simple. You are not limited by it, but it should be implemented to make things running :)
```javascript

BaseInput.updatePropTypes({
  name:PropTypes.string.isRequired,
  value:PropTypes.any.isRequired,
  onChange:PropTypes.func.isRequired,
  onFocusChange:PropTypes.func.isRequired
});

```

1. `name` prop is used in construction of Input events.
2. `value` prop defines visible value of input.
3. `onChange` prop is a callback which on each change of the input value fires an event with next structure `{name, value}` where name is `name` prop and `value` is updated input value.
4. `onFocusChange` props is callback which on each input focus event fires an even with next structure `{name, focus}` where name is `name` prop and `focus` is current input focus value.

Additionally `BaseInput` contains `valueFromEvent` method which should be overridden to extract actual value from a raw event. By default it just returns a raw event.
```javascript
valueFromEvent(e){return e}
```
To make everything working this method should be changed to something like this.
```javascript
valueFromEvent(e){return e.target.value}
```

But this is only description of the BaseInput key moments and interface. Actual implementation of the working input will look like this.

```javascript
import {Input as Base} from "react-generic-form";
import React from "react";
import PropTypes from "prop-types";

const Options=options=>{
  return options.map(e=><option key={e.label} value={e.value}>{e.label}</option>)
}


class Select extends Base{
  constructor(props){
    super(props);
  }

  valueFromEvent(e){
    const {target:{value}} = e;
    try{
      return JSON.parse(value);
    }catch(e){
      return value;
    }
  }

  render(){
    const {
      onChange,
      onBlur,
      onFocus,
      props:{
        onFocusChange,
        options,
        ...rest
      }
    } = this;
    return (
      <select {...rest} onChange={onChange} onBlur={onBlur} onFocus={onFocus}>
        {Options(options)}
      </select>
    );
  }
}

Select.updatePropTypes({
  options:PropTypes.arrayOf(PropTypes.shape({
    value:PropTypes.any.isRequired,
    label:PropTypes.string,
  })),
  value:PropTypes.any,
});

export default Select;
```

Here you can see that `onChange`, `onBlur` and `onFocus` are actually predefined methods which you need to path as props to `raw` input. 
