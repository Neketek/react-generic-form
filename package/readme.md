#### What is this package?

This package is a nice little utility designed to provide an excellent way to generalize forms data and their fundamental interactions.

#### Features:
1. Form&Input data generalization
2. Forms nesting inside other forms
3. Configurable form validation rules stored inside props instead of being hardcoded.
4. Overall code simplification because most of the generic steps hidden under the hood of base components

#### Why is it necessary?

Quite a while ago I was leading development of an ambitious web project which used React in the front end. I quickly found that the creation of the forms is way too repetitive. Most of the time developers were doing the same thing. They were manually creating the form state and data structure. Besides, they were trying to implement complex behavior using callbacks and chaotically placed state fields.  Therefore I made a small utility which simplified their lives a lot.  So now I want to share it with the world.  So, this is just DRY utility. It also helps a lot with a generalization of a data structure. I guess I shouldn't explain why all of this is important.

#### Contents:
1. Component class - it extends basic react component functionality by adding two static methods which allow updating of defaultProps and propTypes static properties.
2. Input class - extends Component class.  Its purpose is the generalization of form inputs to enable the next class, Form, to use these fields. In two words, this class is an "interface" which wraps your custom inputs.  
3. Form class - extends Component class. It is the main class. I combine inputs and other forms(as nested) into a single organized entity.
4. createRule function. It generates a function which Form class uses to verify input values.  It's useful because it gives an ability to change verification rules from props by changing an array of rules for a particular field.  Each rule function has two methods attached to it which set message builder function and rule parameters.

#### General workflow/Tutorial:
1. Wrap custom inputs in extensions of BaseInput component. [Example](https://github.com/Neketek/react-generic-form/blob/master/app/src/component/input/text.jsx)
2. Create reusable field validation rules using createRule function.[Example](https://github.com/Neketek/react-generic-form/blob/master/app/src/component/form/rule.jsx)
3. Create a form extending Form component, add all fields and rules you need.[Example](https://github.com/Neketek/react-generic-form/blob/master/app/src/component/form/name.jsx)
4. Nest some forms just like regular inputsj+ inside other form if you need so.[Example](https://github.com/Neketek/react-generic-form/blob/master/app/src/component/form/profile.jsx)

#### Note:
This is fully functional demo which you can run using docker & docker-compose. It's a linux setup which uses make for commands shortcuts.
