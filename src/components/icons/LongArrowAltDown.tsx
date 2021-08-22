import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons';

export default memo(props => <FontAwesomeIcon icon={faLongArrowAltDown} {...props} />);
