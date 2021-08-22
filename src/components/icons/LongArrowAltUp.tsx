import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';

export default memo(props => <FontAwesomeIcon icon={faLongArrowAltUp} {...props} />);
