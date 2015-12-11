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
import { color, rhythm, fontFamily } from '../theme';
import { nestedGet } from '../utils/ImmutableUtils';

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
