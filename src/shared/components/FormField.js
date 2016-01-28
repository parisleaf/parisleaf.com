import React from 'react';

import Alert from './Alert';
import Button from './Button';
import FlexItem from './FlexItem';

import { rhythm } from '../theme';

const FormField = React.createClass({
  getInitialState() {
    return {
      showErrors  : false,
      isInputValid: false,
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

  render() {
    const style = {
      formField: {
        marginTop: `${rhythm(0)}`,
        marginBottom: `${rhythm(1.5)}`,
      }
    };

    let markAsValid = this.state.isInputValid;
    let markAsRequired = this.props.required && !this.state.value;
    let showErrors = this.state.showErrors && !markAsValid;

    return (
      <FlexItem grow style={style.formField}>
        <label htmlFor={this.props.name}>{[this.props.label, this.props.required ? '*' : '']}</label>
        <input type={this.props.type} name={this.props.name} value={this.state.value} onChange={this.setValue} onBlur={this.showErrors} />
        {showErrors ? <Alert failure>{this.props.validationError}</Alert> : ''}
      </FlexItem>
    );
  }
});

export default FormField;
