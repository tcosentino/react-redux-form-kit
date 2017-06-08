// from: https://gist.github.com/insin/bbf116e8ea10ef38447b
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delaying: !!this.props.delay,
    };
  }

  componentDidMount() {
    if (this.props.delay) {
      this.timeout = setTimeout(this.handleDisplay.bind(this), this.props.delay);
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  handleDisplay() {
    this.timeout = null;
    this.setState({ delaying: false });
  }

  render() {
    const { delay, inline, text } = this.props;
    const { delaying } = this.state;
    const className = classNames('loading', {
      'loading--delaying': delaying,
      'loading--displaying': delay && !delaying,
      'loading--inline': inline,
    });
    return (<div className={className}>
      <i className="fa fa-spin fa-spinner" />
      {text && <div className="Loading__text">{text}&hellip;</div>}
    </div>);
  }
}

Loading.propTypes = {
  delay: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  inline: PropTypes.bool,
  text: PropTypes.string,
};

Loading.defaultProps = {
  delay: 500,
  inline: false,
  text: '',
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

module.exports = Loading;
export default connect(mapStateToProps, mapDispatchToProps)(Loading);
