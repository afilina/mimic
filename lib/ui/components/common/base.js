import React from 'react';
import styled from 'styled-components';

export const DivComponent = (props) => (
  <mimic-div class={ props.className } { ...props }>
    { props.children }
  </mimic-div>
);

export const SpanComponent = (props) => (
  <mimic-span class={ props.className } { ...props }>
    { props.children }
  </mimic-span>
);

export const Div = styled(DivComponent)`
  display: block;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`;

export const Span = styled(SpanComponent)`
  display: inline-block;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`;


