import React, { Component } from 'react';
import Rx, { Observable } from 'rx';
import request from 'superagent';
import serialize from 'form-serialize';
import Helmet from 'react-helmet';
import Flux from 'flummox/component';

import Alert from './Alert';
import Button from './Button';
import FlexItem from './FlexItem';
import FlexContainer from './FlexContainer';
import Metadata from './Metadata';
import SiteContainer from './SiteContainer';
import SuitCSS from 'react-suitcss';
import TitleSection from './TitleSection';

import { ensureIsomorphicUrl } from '../utils/LinkUtils';
import { rhythm } from '../theme';
import { nestedGet } from '../utils/ImmutableUtils';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const ContactHandler = React.createClass({
  statics: {
    routerWillRun({ flux }) {
      const PageActions = flux.getActions('pages');
      return PageActions.getPageBySlug('contact');
    },
  },

  render() {
    return (
      <Flux connectToStores={{
        pages: store => ({
          page: store.getPageBySlug('contact')
        })
      }}>
        <ContactPage />
      </Flux>
    );
  }
});

const ContactPage = React.createClass({
  getInitialState() {
    return {
      errorMessage: null,
      success: null,
      valid: true,
    }
  },

  componentDidMount() {
    const formSubmission = FuncSubject.create();
    this.formSubmission = formSubmission;
    this.form = React.findDOMNode(this.refs.form);

    const formResponse = formSubmission
      .map(event => {
        event.preventDefault();
        const data = serialize(this.form, { hash: true });
        return data;
      })
      .flatMap(data => request.post(ensureIsomorphicUrl('/contact')).send(data).exec());

    const formResponseSuccess = formResponse
      .filter(response => response.ok)
      .doAction(() => {
        this.form.reset();
        this.setState({
          success: true,
          errorMessage: null
        });
      });

    const formResponseFailure = formResponse
      .filter(response => !response.ok)
      .doAction(error => {
        this.setState({
          success: null,
          errorMessage: error.message || 'There was an error with your submission.'
        });
      });

    const isProcessing = Observable
      .combineLatest(
        this.formSubmission.timestamp(),
        formResponse.timestamp(),
        (submission, response) => submission.timestamp > response.timestamp
      )
      .doAction(value => {
        this.setState({ isProcessing: value });
      });

    this.subscription = Observable
      .concat([
        formResponseSuccess,
        formResponseFailure,
        isProcessing
      ])
      .subscribe();
  },

  componentWillUnmount() {
    this.subscription.dispose();
  },

  handleFieldUpdated(status) {
    this.setState({ valid: status });
  },

  onSubmit(event) {
    event.preventDefault();
    if ( this.state.valid === true ) {
      this.setState({ errorMessage: "" });
      this.formSubmission(event);
    } else {
      this.setState({ errorMessage: "One or more fields are not valid." });
    }
  },

  render() {
    const { success, errorMessage } = this.state;
    const { page } = this.props;

    let titleTag = nestedGet(page, 'meta', 'yoast_wpseo_title') || nestedGet(page, 'title');
    titleTag += " | Parisleaf, A Florida Branding & Digital Agency";

    return (
      <div>
        <Helmet
          title={titleTag}
          meta={[
            {"name": "description", "content": nestedGet(page, 'meta', 'yoast_wpseo_metadesc')},
            {"name": "keywords", "content": nestedGet(page, 'meta', 'yoast_wpseo_metakeywords')},
            {"property": "og:description", "content": nestedGet(page, 'meta', 'yoast_wpseo_metadesc')},
            {"property": "og:image", "content": nestedGet(page, 'featured_image', 'source') || ""},
            {"property": "og:title", "content": titleTag},
            {"property": "og:type", "content": "article"},
            {"property": "og:url", "content": "https://parisleaf.com/contact"},
            {"property": "article:author", "content": ""},
            {"property": "article:published_time", "content": ""},
            {"property": "article:modified_time", "content": ""},
          ]} />
        <TitleSection
          title="We&#x2019;re all ears and always happy to lend one."
        />
        <SiteContainer breakAll padAll>
          <form
            className={"Form" + (this.state.isProcessing ? " Form--processing" : (!!this.state.success ? " Form--hidden" : ""))}
            ref="form"
            action="/contact"
            method="post"
            onSubmit={this.onSubmit}
          >
            <FlexRow col2>
              <FormField
                type="text"
                label="Your First Name"
                name="firstName"
                placeholder="Type here!"
                whenFieldUpdated={this.handleFieldUpdated}
                required
              />
              <FormField
                type="text"
                label="Your Last Name"
                name="lastName"
                placeholder="Then here!"
                whenFieldUpdated={this.handleFieldUpdated}
                required
              />
            </FlexRow>
            <FormField
              type="text"
              label="Your Email Address"
              name="email"
              placeholder="hey@parisleaf.com"
              fieldPattern={EMAIL_REGEX}
              whenFieldUpdated={this.handleFieldUpdated}
              required
            />
            <FormField
              type="text"
              label="Your Phone Number"
              name="phone"
              placeholder="(555) 555-5555"
            />
            <FormField
              type="text"
              label="Your Company Name"
              name="company"
            />
            <FormField
              type="text"
              label="Your Ideal Sandwich"
              name="idealSandwich"
              placeholder="Almost done!"
            />
            <FormField
              type="textarea"
              label="Your Message"
              name="message"
              placeholder="All done!"
              className="TextInput"
              rows="4"
              whenFieldUpdated={this.handleFieldUpdated}
              required
            />
            <Button type="submit" secondaryDark>
              Submit
            </Button>
          </form>
          {errorMessage && <Alert failure style={{marginTop: rhythm(2)}}>{errorMessage}</Alert>}
          {success && <Alert success>Thank you for your submission!</Alert>}
        </SiteContainer>
      </div>
    );
  }
});

const FormField = React.createClass({
  getInitialState() {
    return {
      fieldErrorMessage: '',
      fieldIsValid: true
    };
  },

  componentDidMount() {
    if ( this.props.whenFieldUpdated ) this.props.whenFieldUpdated(this.state.fieldIsValid);
  },

  handleChange(event) {
    if ( this.props.required ) this.validateField( event.target.value, this.props.fieldPattern );
  },

  handleBlur(event) {
    if ( this.props.required ) this.validateField( event.target.value, this.props.fieldPattern );
  },

  validateField(value, pattern) {
    if ( !!pattern ) {
      if ( pattern.test(value) ) {
        this.setState({ fieldErrorMessage: "", fieldIsValid: true });
      } else {
        this.setState({ fieldErrorMessage: "This field is not formatted correctly.", fieldIsValid: false });
      }
    } else {
      if ( !!value ) {
        this.setState({ fieldErrorMessage: "", fieldIsValid: true });
      } else {
        this.setState({ fieldErrorMessage: "Please fill out this field.", fieldIsValid: false });
      }
    }
  },

  render() {
    const { label, className, ...props } = this.props;
    let fieldErrorMessage = this.state.fieldErrorMessage;
    let fieldIsValid = this.state.fieldIsValid;

    // Create field from prop definition
    let field;
    switch ( this.props.type ) {
      case "text":
        field = <input className={[className, 'TextInput'].filter(Boolean).join(' ')} onBlur={this.handleBlur} onChange={this.handleChange} {...props} />;
        break;
      case "textarea":
        field = <textarea className={[className, 'TextInput'].filter(Boolean).join(' ')} onBlur={this.handleBlur} onChange={this.handleChange} {...props} />;
        break;
    }

    // Create field error from state definition
    let fieldError;
    if ( fieldErrorMessage ) { fieldError = <Alert failure>{fieldErrorMessage}</Alert> }

    return (
      <FlexItem grow element="label" style={{
        marginTop: `${rhythm(1/2)}`,
        marginBottom: `${rhythm(1/2)}`,
      }}>
        <Metadata>{this.props.label}</Metadata>
        {field}
        {fieldError}
      </FlexItem>
    );
  }
});

const FlexRow = React.createClass({
  render() {
    return (
      <SuitCSS
        componentName="FlexRow"
        element="div"
        className="FlexContainer FlexContainer--fullWidth"
        modifiers={[
          'col2',
        ]}
        {...this.props}
      />
    );
  }
});

const FuncSubject = {
  create() {
    function subject(value) {
      subject.onNext(value);
    }

    for (var key in Rx.Subject.prototype) {
      subject[key] = Rx.Subject.prototype[key];
    }

    Rx.Subject.call(subject);

    return subject;
  }
};

class ErrorMessage extends Component {
  render() {
    return <p className="">{this.props.children}</p>;
  }
}

export default ContactHandler;

// http://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
