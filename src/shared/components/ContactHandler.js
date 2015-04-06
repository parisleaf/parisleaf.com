import React from 'react';
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
import { color, rhythm, fontFamily } from '../theme';

const ContactHandler = React.createClass({
  async onSubmit(event) {
    event.preventDefault();

    const form = event.target;

    const body = serialize(form, { hash: true });

    console.log(body);

    await request.post(ensureIsomorphicUrl('/contact')).send(body).exec();
  },

  render() {
    return (
      <div>
        <PageHeader
          title="Get in touch."
          subtitle="We'd love to hear from you."
        />
        <SiteContainer>
          <form
            action="/contact"
            method="post"
            onSubmit={this.onSubmit}
            style={{
              padding: `${rhythm(1)} 0`,
            }}
          >
            <FlexRow col2>
              <TextInput
                label="Your First Name"
                name="firstName"
                placeholder="Type here!"
              />
              <TextInput
                label="Your Last Name"
                name="lastName"
                placeholder="Then here!"
              />
            </FlexRow>
            <TextInput
              label="Your Email Address"
              name="email"
              placeholder="hey@parisleaf.com"
            />
            <TextInput
              label="Your Company Name"
              name="company"
              placeholder="Almost done!"
            />
            <TextInput
              label="Your Ideal Sandwich"
              name="idealSandwich"
              placeholder="All done!"
            />
            <Button type="submit" secondaryDark>
              Submit
            </Button>
          </form>
        </SiteContainer>
      </div>
    );
  }
});

const TextInput = React.createClass({
  render() {
    const { label, style, className, ...props } = this.props;

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
          style={{
            width: '100%',
            background: color('lightGray'),
            fontFamily: fontFamily('alrightBlack'),
            padding: `${rhythm(1/2)} ${rhythm(1)}`,
            margin: `${rhythm(1/2)} 0`,
            lineHeight: 1.5,
            minHeight: rhythm(1.5),
            ...style
          }}
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
