import React from 'react';

import Alert from './Alert';
import Button from './Button';
import FlexItem from './FlexItem';
import SvgIcon from './SvgIcon';

import { rhythm, color } from '../theme';

const FormField = React.createClass({
  getInitialState() {
    return {
      isFocused   : false,
      isInputValid: false,
      showErrors  : false,
      serverError : '',
      value       : this.props.value || '',
    };
  },

  componentWillMount() {
    this.props.attachToForm(this);
  },

  componentWillUnmount() {
    this.props.detachFromForm(this);
  },

  setValue(e) {
    this.setState({
      value: e.currentTarget.value
    }, function() {
      this.props.validate(this);
    }.bind(this));
  },

  showErrors() {
    if (!this.state.showErrors) {
      this.setState({showErrors: true})
    }
  },

  handleInputFocus(e) {
    this.setState({isFocused: true});
  },

  handleInputChange(e) {
    this.setValue(e);
  },

  handleInputBlur(e) {
    this.setState({isFocused: false});
    this.showErrors();
  },

  render() {
    const style = {
      errorIcon: {
        width: `${rhythm(0.3)}`,
        height: `${rhythm(0.3)}`,
        marginRight: `${rhythm(0.2)}`,
        fill: `${color('darkGray')}`
      }
    };

    // Set rules for custom classes
    const markAsEmpty    = !this.state.value;
    const markAsFocused  = this.state.isFocused;
    const markAsRequired = this.props.required && !this.state.value;
    const markAsValid    = !this.state.isFocused && this.state.isInputValid && this.state.value;
    const markAsInvalid  = this.state.showErrors && !this.state.isInputValid;

    // Assign custom classes
    const fieldClasses = ['Field'];
    const labelClasses = ['Field-label'];
    const inputClasses = ['Field-input'];
    const errorClasses = ['Field-error'];

    if (markAsFocused) fieldClasses.push('Field--isFocused');
    if (!markAsEmpty) fieldClasses.push('Field--isNotEmpty');
    if (markAsInvalid) fieldClasses.push('Field--isNotValid');
    if (markAsValid) fieldClasses.push('Field--isValid');

    // Build fields based on the "type" prop
    let field = null;
    switch (this.props.type) {
      case 'textarea':
        field = <textarea ref="input" className={inputClasses.join(' ')} name={this.props.name} value={this.state.value} onChange={this.handleInputChange} onBlur={this.handleInputBlur} onFocus={this.handleInputFocus} {...this.props} />;
        break;
      default:
        field = <input ref="input" className={inputClasses.join(' ')} type={this.props.type} name={this.props.name} value={this.state.value} onChange={this.handleInputChange} onBlur={this.handleInputBlur} onFocus={this.handleInputFocus} {...this.props} />;
        break;
    }

    // Set error message on input
    let fieldError = '';
    if (this.state.serverError.length > 0) {
      // If there are server errors, set them here
      fieldError = this.state.serverError;
    } else {
      // Show the default error from this.props.validationError
      fieldError = this.props.validationError;
    }

    return (
      <FlexItem className={fieldClasses.join(' ')} grow>
        <label ref="label" className={labelClasses.join(' ')} htmlFor={this.props.name}>
          {[this.props.label, this.props.required ? '*' : '']}
        </label>
        {field}
        <div ref="error" className={errorClasses.join(' ')}>{markAsInvalid ? [<SvgIcon name="xmark" style={style.errorIcon} />,fieldError] : ''}</div>
      </FlexItem>
    );
  }
});

export default FormField;
