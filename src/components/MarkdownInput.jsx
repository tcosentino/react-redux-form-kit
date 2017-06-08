// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import React from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';

import FormField from './FormField';

// const TextAreaInput = (props) => {
class MarkdownInput extends React.Component {
  static createValueFromMd(value) {
    return value && value.length ?
      RichTextEditor.createValueFromString(value, 'markdown') :
      RichTextEditor.createEmptyValue();
  }

  static getToolbarConfig() {
    return {
      // Optionally specify the groups to display (displayed in the order listed).
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
      INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Monospace', style: 'CODE' },
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'Heading Large', style: 'header-one' },
        { label: 'Heading Medium', style: 'header-two' },
        { label: 'Heading Small', style: 'header-three' },
        { label: 'Code Block', style: 'code-block' },
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' },
        { label: 'Blockquote', style: 'blockquote' },
      ],
    };
  }

  constructor(props) {
    super(props);
    const { value } = this.props.input;

    this.state = {
      value: MarkdownInput.createValueFromMd(value),
      mdValue: value,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps.input;
    if (value !== this.state.mdValue) {
      this.setState({
        value: MarkdownInput.createValueFromMd(value),
        mdValue: value,
      });
    }
  }

  handleChange(value) {
    let markdown = value.toString('markdown');
    this.setState({ value, mdValue: markdown }, () => {
      // check for empty
      if (markdown.length === 2 &&
        markdown.charCodeAt(0) === 8203 &&
        markdown.charCodeAt(1) === 10) {
        markdown = '';
      }

      this.props.input.onChange(markdown);
    });
  }

  render() {
    const {
      help, label, prefix, noLabel, vertical,
      input: { onChange, ...inputProps },
      meta,
    } = this.props;

    const { value } = this.state;

    return (
      <FormField
        label={label}
        prefix={prefix}
        meta={meta}
        help={help}
        noLabel={noLabel}
        vertical={vertical}
        className="md-editor"
      >
        <RichTextEditor
          onChange={this.handleChange}
          {...inputProps}
          value={value}
          toolbarConfig={MarkdownInput.getToolbarConfig()}
        />
      </FormField>
    );
  }
}

MarkdownInput.shouldComponentUpdate = FormField.shouldFormFieldUpdate;

MarkdownInput.propTypes = {
  meta: PropTypes.shape().isRequired,
  help: PropTypes.string,
  vertical: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  prefix: PropTypes.node,
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  noLabel: PropTypes.bool,
};

MarkdownInput.defaultProps = {
  help: '',
  label: '',
  prefix: null,
  noLabel: false,
  vertical: false,
};

export default MarkdownInput;
