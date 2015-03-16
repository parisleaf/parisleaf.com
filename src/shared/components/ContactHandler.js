import React from 'react';
import PageHeader from './PageHeader';
import SiteContainer from './SiteContainer';
import Metadata from './Metadata';
import Button from './Button';
import SuitCSS from 'react-suitcss'
import FlexContainer from './FlexContainer';
import FlexItem from './FlexItem';
import { color, rhythm, fontFamily } from '../theme';

const ContactHandler = React.createClass({
  render() {
    return (
      <div>
        <PageHeader
          title="Get in Touch."
          subtitle="We'd love to hear your crazy ideas."
        />
        <SiteContainer>
          <form action="/login" method="post" style={{
            padding: `${rhythm(1)} 0`,
          }}>
            <FormRow col2>
              <TextInput
                label="Your First Name"
                placeholder="Benji"
              />
              <TextInput
                label="Your Last Name"
                placeholder="Haselhurst"
              />
            </FormRow>
            <TextInput
              label="Your Email Address"
              placeholder="Female@gmail.com"
            />
            <TextInput
              label="Your Company Name"
              placeholder="Kitty Whispers"
            />
            <TextInput
              label="Your Ideal Sandwich"
              placeholder="Yucca pancake reuben"
            />
            <Button type="submit" secondaryDark>Submit</Button>
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

const FormRow = React.createClass({
  render() {
    return (
      <SuitCSS
        componentName="FormRow"
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
