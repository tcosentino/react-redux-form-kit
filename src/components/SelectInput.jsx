// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import _ from 'underscore';
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ConfirmModal from '../../shared/ConfirmModal';

import FormField from './FormField';
import Loading from './Loading';

class SelectInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      showModal: false,
      pendingVal: null,
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const myOptions = this.getOptions();
    const { enableEmpty } = this.props;

    if (!this.valueInOptions() && !enableEmpty && myOptions[0]) {
      this.sendChange(myOptions[0].value);
    }
  }

  getOptions() {
    const { options, enableAll } = this.props;
    const myOptions = options.map(item => ({
      ...item, value: item.id, label: item.name,
    }));

    if (enableAll) {
      myOptions.unshift({ value: 'all', label: 'All' });
    }

    return myOptions;
  }

  getValue() {
    const { input, jsonParse } = this.props;

    let val = input.value;

    if (jsonParse) {
      val = JSON.stringify(input.value);
    }

    return val;
  }

  valueInOptions() {
    const myOptions = this.getOptions();
    const value = this.getValue();

    let valFound = false;
    _.each(myOptions, (option) => {
      valFound = valFound ||
                 (option.value === value) ||
                 (JSON.stringify(option.value) === value);
    });

    return valFound;
  }

  // this is confusing.. needs to be cleared up
  handleChange(val) {
    const { jsonParse } = this.props;

    let update = val ? val.value : val;
    console.log(update);

    if (jsonParse) {
      try {
        update = JSON.parse(update);
      } catch (e) {
        console.log('couldnt parse');
      }
    }
    console.log(update);

    this.sendChange(update);
  }

  sendChange(value) {
    const { onChangeAction, input } = this.props;

    input.onChange(value);
    this.setState({ value });
    onChangeAction(value, input.name);
  }


  render() {
    const {
      label, help, loading, enableEmpty,
      meta, noLabel, disabled, vertical, optionRenderer, valueRenderer,
      input, input: { ...inputProps }, confirm, confirmMessage,
    } = this.props;

    const myOptions = this.getOptions();
    let value = this.getValue();
    const valFound = this.valueInOptions();

    if (!valFound) {
      value = enableEmpty || !myOptions[0] ? null : myOptions[0].value;
    }

    return (
      <FormField
        label={label}
        vertical={vertical}
        meta={meta}
        help={help}
        noLabel={noLabel}
        loading={loading}
      >
        { loading ?
          <Loading /> :
          <Select
            {...inputProps}
            name={input.name}
            title={myOptions.length === 0 ? 'no available options' : ''}
            disabled={myOptions.length === 0 || disabled}
            value={value}
            onBlur={() => input.onBlur(input.value)}
            options={myOptions}
            clearable={enableEmpty}
            optionRenderer={optionRenderer}
            valueRenderer={valueRenderer}
            onChange={(val) => {
              if (confirm) {
                this.setState({ showModal: true, pendingVal: val });
              } else {
                this.handleChange(val);
              }
            }}
            ref={(select) => { this.select = select; }}
          />
        }
        <ConfirmModal
          show={this.state.showModal}
          title="Confirm change"
          message={
            confirmMessage ||
            'Are you sure you want to delete this process?'
          }
          onConfirm={() => {
            this.handleChange(this.state.pendingVal);
            this.setState({ showModal: false, pendingVal: null });
          }}
          onCancel={() => {
            this.setState({ showModal: false, pendingVal: null });
          }}
        />
      </FormField>
    );
  }
}

SelectInput.propTypes = {
  meta: PropTypes.shape().isRequired,
  help: PropTypes.string,
  label: PropTypes.string,
  loading: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape()),
  enableAll: PropTypes.bool,
  enableEmpty: PropTypes.bool,
  onChangeAction: PropTypes.func,
  input: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  confirmMessage: PropTypes.string,
  confirm: PropTypes.bool,
  noLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  vertical: PropTypes.bool,
  jsonParse: PropTypes.bool,
  optionRenderer: PropTypes.func,
  valueRenderer: PropTypes.func,
};

SelectInput.defaultProps = {
  name: '',
  help: '',
  label: '',
  value: '',
  confirmMessage: 'Are you sure you want to make this change?',
  confirm: false,
  noLabel: false,
  loading: false,
  disabled: false,
  enableAll: false,
  enableEmpty: false,
  vertical: false,
  jsonParse: false,
  options: [],
  optionRenderer: undefined,
  valueRenderer: undefined,
  onChangeAction: () => {},
};

module.exports = SelectInput;
