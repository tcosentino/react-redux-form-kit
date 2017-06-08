// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

import FormField from './FormField';

const TextInput = (props) => {
  const {
  help, label, type, prefix, noLabel, vertical,
    input: { ...inputProps },
    meta, disabled,
  } = props;

  return (
    <FormField
      label={label}
      prefix={prefix}
      meta={meta}
      help={help}
      vertical={vertical}
      noLabel={noLabel}
    >
      <FormControl
        type={type}
        disabled={disabled}
        {...inputProps}
      />
    </FormField>
  );
};

TextInput.shouldComponentUpdate = FormField.shouldFormFieldUpdate;

TextInput.propTypes = {
  meta: PropTypes.shape().isRequired,
  vertical: PropTypes.bool,
  help: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  type: PropTypes.string,
  prefix: PropTypes.node,
  input: PropTypes.shape().isRequired,
  noLabel: PropTypes.bool,
  disabled: PropTypes.bool,
};

TextInput.defaultProps = {
  disabled: false,
  help: '',
  label: '',
  vertical: false,
  type: 'text',
  prefix: null,
  noLabel: false,
};

export default TextInput;
