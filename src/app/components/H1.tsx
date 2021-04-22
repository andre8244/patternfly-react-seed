import React from 'react';
import { Title } from '@patternfly/react-core';

class H1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Title headingLevel="h1" className="mg-bottom-sm">{this.props.children}</Title>
    );
  }
}

export { H1 };
