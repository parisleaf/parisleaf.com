import React, { Component } from 'react';
import Rx, { Observable } from 'rx';
import request from 'superagent';
import serialize from 'form-serialize';
import { ensureIsomorphicUrl } from '../utils/LinkUtils';
import PageHeader from './PageHeader';
import SiteContainer from './SiteContainer';
import Metadata from './Metadata';
import Button from './Button';
import SuitCSS from 'react-suitcss'
import FlexContainer from './FlexContainer';
import FlexItem from './FlexItem';
import Alert from './Alert';
import { color, rhythm, fontFamily } from '../theme';

const style = {
  textInput: {
    width: '100%',
    background: color('lightGray'),
    fontFamily: fontFamily('alrightBlack'),
    padding: `${rhythm(1/2)} ${rhythm(1)}`,
    margin: `${rhythm(1/2)} 0`,
    lineHeight: 1.5,
    minHeight: rhythm(1.5),
  }
}

const ContactHandler = React.createClass({
  getInitialState() {
    return {
      errorMessage: null,
      success: null,
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

  onSubmit(event) {
    event.preventDefault();
    this.formSubmission(event);
  },

  render() {
    const { success, errorMessage } = this.state;

    return (
      <div>
        <PageHeader
          title="Get in touch."
          subtitle="We'd love to hear from you."
        />
        <SiteContainer>
          <form
            ref="form"
            action="/contact"
            method="post"
            onSubmit={this.onSubmit}
            style={{
              padding: `${rhythm(1)} 0`,
            }}
          >
            <FlexRow col2>
              <TextInput
                type="text"
                label="Your First Name"
                name="firstName"
                placeholder="Type here!"
              />
              <TextInput
                type="text"
                label="Your Last Name"
                name="lastName"
                placeholder="Then here!"
              />
            </FlexRow>
            <TextInput
              type="text"
              label="Your Email Address"
              name="email"
              placeholder="hey@parisleaf.com"
            />
            <TextInput
              type="text"
              label="Your Company Name"
              name="company"
              placeholder="Almost done!"
            />
            <TextInput
              type="text"
              label="Your Ideal Sandwich"
              name="idealSandwich"
              placeholder="All done!"
            />
            <FlexItem grow element="label" style={{
              marginTop: `${rhythm(1/2)}`,
              marginBottom: `${rhythm(1/2)}`,
            }}>
              <Metadata>Your Message</Metadata>
              <textarea
                name="message"
                style={style.textInput}
                className="TextInput"
              />
            </FlexItem>
            {errorMessage && <Alert error>{errorMessage}</Alert>}
            {success && <Alert success>Thank you for your submission!</Alert>}
            <Button type="submit" secondaryDark>
              Submit
            </Button>
          </form>
        </SiteContainer>
      </div>
    );
  }
});

class ErrorMessage extends Component {
  render() {
    return <p className="">{this.props.children}</p>;
  }
}

const TextInput = React.createClass({
  render() {
    const { label, style: _style, className, ...props } = this.props;

    return (
      <FlexItem grow element="label" style={{
        marginTop: `${rhythm(1/2)}`,
        marginBottom: `${rhythm(1/2)}`,
      }}>
        <Metadata>{this.props.label}</Metadata>
        <input
          className={[
            className,
            'TextInput'
          ].filter(Boolean).join(' ')}
          style={{ ...style.textInput, ..._style }}
          {...props}
        />
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

export default ContactHandler;


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
