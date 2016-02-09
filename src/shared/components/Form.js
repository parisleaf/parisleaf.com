import React from 'react';
import request from 'superagent';
import serialize from 'form-serialize';
import tweenState from 'react-tween-state';
import validator from 'validator';

import Alert from './Alert';
import Button from './Button';
import FlexItem from './FlexItem';
import SvgIcon from './SvgIcon';

import { ensureIsomorphicUrl } from '../utils/LinkUtils';
import { rhythm, color } from '../theme';

const scaleCentered = function(value) {
  return {
    transform: `scale(${value}) translateX(0%) translateY(0%)`,
    webkitTransform: `scale(${value}) translateX(0%) translateY(0%)`,
  }
};

const Form = React.createClass({
  mixins: [tweenState.Mixin],

  getInitialState() {
    return {
      isFormValid              : false,
      isSubmitting             : false,
      isComplete               : false,
      opacity                  : 1,
      checkmarkStrokeDashoffset: 140,
      checkmarkMessageOpacity  : 0,
    }
  },

  componentWillMount() {
    // model = {
    //   my_field_name: {
    //     value: "some input value",
    //     validations: "isEmail",
    //     validationError: "Please enter a valid email."
    //   },
    //   ...
    // }
    this.model = {}; // form input values
    this.inputs = {}; // form input components
    this.children = this.registerInputs(this.props.children); // process children components
  },

  componentDidMount() {
    this.validateForm();

    // Focus on first input on load
    // const firstInput = this.inputs[Object.keys(this.inputs)[0]];
    // firstInput.refs.input.getDOMNode().focus();

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

  attachToForm(component) {
    this.inputs[component.props.name] = component;
    this.model[component.props.name] = {};
    this.model[component.props.name].value = component.state.value;
    this.model[component.props.name].validations = component.props.validations;
    this.model[component.props.name].validationError = component.props.validationError;
    this.validate(component);
  },

  detachFromForm(component) {
    delete this.inputs[component.props.name];
    delete this.model[component.props.name];
  },

  updateModel() {
    Object.keys(this.inputs).forEach(function (name) {
      this.model[name].value = this.inputs[name].state.value;
    }.bind(this));
  },

  validate(component) {

    // Assume the input is valid by default
    let isValid = true;

    // We only validate if the input has a value, or if it is required
    if (component.props.value || component.props.required) {

      // Now we read the "validations" prop and find the individual validator parameters
      // For example, the prop may read: validations="isNumeric,isLength:5"
      // We want to get the methods from that string, and an array of each method's parameters
      // So for the method "isLength", we have the array [component.state.value, 5]
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
      isInputValid: isValid,
      serverError: '',
    }, this.validateForm);
  },

  validateForm() {
    let isValid = true;
    let inputs = this.inputs;

    // Loop through inputs and check if any have a false state
    Object.keys(inputs).forEach(function(name) {
      if (inputs[name].state.isInputValid === false) {
        isValid = false;
      }
    });

    this.setState({
      isFormValid: isValid
    });
  },

  showErrors() {
    let inputs = this.inputs;

    Object.keys(inputs).forEach(function(name) {
      inputs[name].setState({
        showErrors: true
      });
    });
  },

  focusOnFirstError() {
    let inputs = this.inputs;

    Object.keys(inputs).every(function(name) {
      if (!inputs[name].state.isInputValid) {
        inputs[name].refs.input.getDOMNode().focus();
        return false;
      } else {
        return true;
      }
    });
  },

  onSubmit(e) {
    e.preventDefault();

    // Disable submit button and validate form again
    this.setState({
      isSubmitting: true
    }, this.validateForm);

    // If the state of the form is valid, we're good to go
    if (this.state.isFormValid === true) {

      // Update the model with the latest data
      this.updateModel();

      // TODO: Add google recaptcha support
      // Grab the g-recaptcha-response value from the POST data
      // Send a POST request to Google @ `https://www.google.com/recaptcha/api/siteverify` with the following parameters:
      // + secret: (your site’s reCaptcha secret key)
      // + response: (the captcha response you recieved from the front-end `g-recaptcha-response`)
      // + remoteip: (optional: the user’s ip address)
      // Google will respond with a response containing a success field
      //
      // this.model['g-recaptcha-response'] = grecaptcha.getResponse(this.recaptchaId);

      request.post(ensureIsomorphicUrl(this.props.action))
        .send(this.model)
        .end(function(err, res){
          if (res.error) {
            // TODO: Catch server errors and display them under the submit button
            console.log('A server error was encountered. Please refresh the page and try again.');
          } else {
            this.onSuccess(res);
          }
        }.bind(this));
    } else {
      // TODO: Show all field errors and focus on the first offending input
      this.showErrors();
      this.focusOnFirstError();

      // Open up form for resubmission
      this.setState({
        isSubmitting: false
      });
    }
  },

  onSuccess(response) {
    const errors = response.body.errors;

    if (!errors) {
      this.setCompletedState();
    } else {
      Object.keys(errors).forEach(function (name) {
        var component = this.inputs[name];
        component.setState({
          isInputValid: false,
          serverError: errors[name],
        });
        this.setState({
          isSubmitting: false,
        }, this.validateForm);
      }.bind(this));
    }
  },

  setCompletedState() {
    this.setState({
      isSubmitting: false,
      isComplete: true,
    });
    this.tweenState('opacity', {
      easing: tweenState.easingTypes.linear,
      duration: 300,
      endValue: this.state.opacity === 0 ? 1 : 0,
    });
    this.tweenState('checkmarkStrokeDashoffset', {
      easing: tweenState.easingTypes.easeInQuad,
      delay: 650,
      duration: 300,
      endValue: this.state.checkmarkStrokeDashoffset === 140 ? 0 : 140,
      onEnd: function() {
        this.tweenState('checkmarkMessageOpacity', {
          easing: tweenState.easingTypes.linear,
          delay: 150,
          duration: 300,
          endValue: this.state.checkmarkMessageOpacity === 1 ? 0 : 1,
        });
      }.bind(this)
    });
  },

  render() {
    const style = {
      wrapper: {
        position: 'relative'
      },
      form: {
        opacity: this.getTweeningValue('opacity'),
      },
      captchaField: {
        marginTop: `${rhythm(0)}`,
        marginBottom: `${rhythm(1.5)}`,
      }
    };

    let checkmarkStyle = {
      container: {
        display: this.getTweeningValue('checkmarkStrokeDashoffset') === 140 ? 'none' : 'flex',
      },
      icon: {
        strokeDashoffset: this.getTweeningValue('checkmarkStrokeDashoffset'),
      },
      message: {
        opacity: this.getTweeningValue('checkmarkMessageOpacity'),
      }
    }

    const markAsComplete = this.state.isComplete;
    const markAsSubmitting = this.state.isSubmitting;

    // Set conditional classes
    const formClasses = ['Form'];
    if (markAsSubmitting) formClasses.push('Form--isSubmitting');
    if (markAsComplete) formClasses.push('Form--isComplete');

    return (
      <div style={style.wrapper}>
        <form className={formClasses.join(' ')} action={this.props.action} method={this.props.method} noValidate onSubmit={this.onSubmit} style={style.form}>
          {this.children}
          {this.props.recaptcha ? <FlexItem grow style={style.captchaField}><div ref="recaptcha"></div></FlexItem> : ''}
          <Button ref="submit" type="submit" disabled={this.state.isSubmitting || this.state.isComplete} secondaryDark>Submit</Button>
        </form>
        <div className="Form-checkmark" style={checkmarkStyle.container}>
          <SvgIcon className="Form-checkmark-icon" name="checkoutline" style={checkmarkStyle.icon} />
          <div className="Form-checkmark-message" style={checkmarkStyle.message} dangerouslySetInnerHTML={{__html: 'Great Scott, it worked! We&#39;ve recieved your message and will be in touch as soon as possible.'}} />
        </div>
      </div>
    );
  }
});

export default Form;
