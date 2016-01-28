import React from 'react';
import request from 'superagent';
import serialize from 'form-serialize';
import validator from 'validator';

import Alert from './Alert';
import Button from './Button';
import FlexItem from './FlexItem';

import { ensureIsomorphicUrl } from '../utils/LinkUtils';
import { rhythm } from '../theme';

const Form = React.createClass({
  getInitialState() {
    return {
      isFormValid   : false,
      isSubmitting  : false,
      isComplete    : false,
    }
  },

  componentWillMount() {
    this.model = {}; // form input values
    this.inputs = {}; // form input components
    this.children = this.registerInputs(this.props.children); // process children components
  },

  componentDidMount() {
    this.validateForm();

    // Load reCAPTCHA
    // TODO: Get the site key from our .env file
    if (this.props.recaptcha) {
      this.recaptchaId = grecaptcha.render(this.refs.recaptcha.getDOMNode(), {
        sitekey: '6Lf0nBYTAAAAAFyRoi9OBvQYC6xodZLDvtHkxeOU'
      });
    }
  },

  registerInputs(children) {
    const clonedChildren = [];
    // We want to add these props to all the form inputs
    const clonedChildProps = {
      attachToForm: this.attachToForm,
      detachFromForm: this.detachFromForm,
      validate: this.validate
    };

    // Loop through the child components and return an array of components with the new props
    React.Children.forEach(children, function(child, i) {

      // Set defaults
      clonedChildProps.key = i;
      clonedChildProps.validations = child.props.validations ? child.props.validations : false;
      clonedChildProps.validationError = child.props.validationError ? child.props.validationError : false;

      // We need to see if the input is marked as "isRequired". If it is, we add a validation rule
      // that ensures there is a value. The input should not be valid with an empty value.
      if (child.props.required) {
        clonedChildProps.validations = clonedChildProps.validations ? clonedChildProps.validations + ',' : '';
        clonedChildProps.validations += 'isLength:1';

        if (!clonedChildProps.validationError) {
          clonedChildProps.validationError = 'Please fill out this field.';
        }
      }

      // Only add the props to form input components (the ones with the name prop)
      if (child.props.name) {
        clonedChildren.push(React.cloneElement(child, clonedChildProps));
      } else {
        clonedChildren.push(child);
      }

      // Let's also run through the children of our children and so on...
      if (child.props.children) {
        this.registerInputs(child.props.children);
      }
    }.bind(this));

    return clonedChildren;
  },

  validate(component) {

    // Assume the input is valid by default
    let isValid = true;

    // We only validate if the input has a value, or if it is required
    if (component.props.value || component.props.required) {

      // The following just reads the "validations" prop and finds the individual parameters
      // For example, the prop may read: validations="isNumeric,isLength:5"
      // We want to get the methods from that string, and an array of each method's parameters
      // So for the method "isLength", we have the array ["value", 5]
      component.props.validations.split(',').forEach(function (validation) {
        let args = validation.split(':');
        let validateMethod = args.shift();

        args = args.map(function(arg) { return JSON.parse(arg); });
        args = [component.state.value].concat(args);

        if (!validator[validateMethod].apply(validator, args)) {
          isValid = false;
        }
      });
    }

    // Update the state of this component, and then the entire form
    component.setState({
      isInputValid: isValid
    }, this.validateForm);
  },

  validateForm() {
    let isValid = true;

    // Loop through inputs and check if any have a false state
    let inputs = this.inputs;
    Object.keys(inputs).forEach(function(name) {
      if (inputs[name].state.isInputValid === false) {
        isValid = false;
      }
    });

    this.setState({
      isFormValid: isValid
    });
  },

  attachToForm(component) {
    this.inputs[component.props.name] = component;
    this.model[component.props.name] = component.state.value;
    this.validate(component);
  },

  detachFromForm(component) {
    delete this.inputs[component.props.name];
    delete this.model[component.props.name];
  },

  updateModel() {
    Object.keys(this.inputs).forEach(function (name) {
      this.model[name] = this.inputs[name].state.value;
    }.bind(this));
  },

  onSubmit(e) {
    e.preventDefault();

    // Disable submit button
    this.setState({
      isSubmitting: true
    });

    // If the state of the form is valid, we're good to go
    if (this.state.isFormValid === true) {
      this.updateModel();
      this.model['g-recaptcha-response'] = grecaptcha.getResponse(this.recaptchaId);
      request.post(ensureIsomorphicUrl(this.props.action)).send(this.model).exec().then(this.onSuccess);
    } else {
      // TODO: Show all field errors and focus on the first offending input
      

      // Open up form for resubmission
      this.setState({
        isSubmitting: false
      });
    }
  },

  onSuccess() {
    console.log('submit complete!');

    this.setState({
      isSubmitting: false,
      isComplete: true
    });
  },

  render() {
    const style = {
      captchaField: {
        marginTop: `${rhythm(0)}`,
        marginBottom: `${rhythm(1.5)}`,
      }
    };

    return (
      <form action={this.props.action} method={this.props.method} onSubmit={this.onSubmit}>
        {this.children}
        <FlexItem grow style={style.captchaField}>
          <div ref="recaptcha"></div>
        </FlexItem>
        <Button type="submit" disabled={this.state.isSubmitting || this.state.isComplete} secondaryDark>Submit</Button>
      </form>
    );
  }
});

export default Form;
