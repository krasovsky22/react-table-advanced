import React, { memo } from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PencilIcon = props => <FontAwesomeIcon icon={faPencilAlt} {...props} />;

export default memo(PencilIcon);
