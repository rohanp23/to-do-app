import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      className="position-absolute top-50 start-50"
    >
      <span className="visually-hidden">
        <Spinner animation="border" variant="primary" />
      </span>
    </Spinner>
  );
};

export default Loading;
