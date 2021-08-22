import React, { memo } from 'react';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FileIcon = props => <FontAwesomeIcon icon={faFilter} {...props} />;

export default memo(FileIcon);
