import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const HoverHelp = ({ help, position }) => {
  const helpPopover = (
    <Popover id={`field-${name}-help`}>
      {help}
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement={position}
      overlay={helpPopover}
      rootClose
    >
      <i className="fa fa-question-circle" />
    </OverlayTrigger>
  );
};

// Define property types
HoverHelp.propTypes = {
  help: PropTypes.string.isRequired,
  position: PropTypes.string,
};

HoverHelp.defaultProps = {
  position: 'right',
};

export default HoverHelp;
