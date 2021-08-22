import React, { memo } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default memo(props => <FontAwesomeIcon icon={faTrash} {...props} />);
