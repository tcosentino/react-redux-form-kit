// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import {
  FormGroup, ControlLabel, HelpBlock, Col,
} from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import HoverHelp from '../HoverHelp';

const FIELD_EVENT_HANDLER = /^(?:on|handle)[A-Z]/;

/**
 * Perform shallow equals comparison of two redux-form field objects to
 * determine if the field has changed.
 */
function fieldShallowEquals(field, nextField) {
  field.foreach((prop) => {
    // Ignore event handlers, as they continually get recreated by redux-form
    if (!FIELD_EVENT_HANDLER.test(prop) && field[prop] !== nextField[prop]) {
      return false;
    }
  });

  return true;
}

class FormField extends React.Component {
  /**
   * Perform shallow equals comparison to determine if the props of the context
   * form field component have changed, with special-case handling for the "field"
   * prop, provided by redux-form.
   * Use this as shouldComponentUpdate() on components which compose a
   * FormField in their render() method and they will only re-render when
   * necessary.
   */
  static shouldFormFieldUpdate(nextProps) {
    const keys = Object.keys(this.props);
    const nextKeys = Object.keys(nextProps);
    if (keys.length !== nextKeys.length) return true;
    const nextHasOwnProperty = Object.prototype.hasOwnProperty.bind(nextProps);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!nextHasOwnProperty(key) ||
          key === 'field' ? !fieldShallowEquals(this.props[key], nextProps[key])
                          : this.props[key] !== nextProps[key]) {
        return true;
      }
    }
    return false;
  }

  calculateWidth() {
    const { noLabel, vertical } = this.props;

    if (vertical) {
      return 12;
    }

    return noLabel ? 12 : 8;
  }

  render() {
    const {
      help, label, prefix, meta: { error }, loading, noLabel,
    } = this.props;

    if (loading) {
      return (<span><Loading /> Field Loading...</span>);
    }

    const validation = error ? 'error' : null;

    const width = this.calculateWidth();
    const offset = 12 - width;

    return (
      <FormGroup className="clearfix" validationState={validation}>
        { !noLabel &&
          <Col xs={12} md={offset}>
            <ControlLabel>
              {prefix}{' '}{label}{'  '}
              { help && <HoverHelp help={help} /> }
            </ControlLabel>
          </Col>
        }
        <Col xs={12} md={width}>
          { this.props.children }
        </Col>
        <Col xs={12} md={width} mdOffset={offset}>
          { error && <HelpBlock>{error}</HelpBlock> }
        </Col>
      </FormGroup>
    );
  }
}


FormField.propTypes = {
  meta: PropTypes.shape(),

  // Help text to be displayed next to the label
  help: PropTypes.string,

  // Label text
  label: PropTypes.string,
  prefix: PropTypes.node,

  noLabel: PropTypes.bool,

  vertical: PropTypes.bool,

  // Loading state
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

FormField.defaultProps = {
  help: '',
  label: '',
  type: 'text',
  prefix: null,
  vertical: false,

  meta: { error: '' },

  loading: false,
  noLabel: false,

  inputClass: '',
  field: {},
  inputProps: {},
};


module.exports = FormField;
