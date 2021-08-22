import React, { memo } from 'react';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default memo(props => <FontAwesomeIcon icon={faSave} {...props} />)