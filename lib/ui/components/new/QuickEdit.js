import React from 'react';
import _ from 'lodash';
import HttpStatus from 'http-status-codes';
import CompactSelect from 'ui/components/new/CompactSelect';
import tuneIcon from 'ui/assets/images/tune@2x.png';
import stopwatchIcon from 'ui/assets/images/stopwatch@2x.png';
import selectIcon from 'ui/assets/images/up-down@2x.png';
import leftIcon from 'ui/assets/images/left@2x.png';
import rightIcon from 'ui/assets/images/right@2x.png';

const containerStyle = {
  display: 'flex',
  position: 'fixed',
  bottom: '0',
  width: '100%',
  zIndex: '999999999999',
  backgroundColor: 'white',
  borderTop: '1px solid #e7e7e7',
  fontSize: '14px',
  height: '25px',
  fontFamily: 'Arial, sans-serif'
};

const sectionStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 6px',
  borderRight: '1px solid #e7e7e7'
};

const responseBodySectionStyle = Object.assign({}, sectionStyle, {
  flexGrow: 1
});

const arrowSectionStyle = Object.assign({}, sectionStyle, {
  cursor: 'pointer'
});

const disabledArrowSectionStyle = Object.assign({}, sectionStyle, {
  opacity: '0.3'
});

const responseBodyInputStyle = {
  border: 'none',
  width: '100%',
  fontSize: '12px',
  outline: '0'
};

const applyButtonStyle = {
  color: 'white',
  backgroundColor: '#2d7bd1',
  display: 'inline-block',
  padding: '3px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  cursor: 'pointer'
};

const iconStyle = {
  height: '16px'
};

const delayOptions = [
  { value: 500, label: '0.5s' },
  { value: 1000, label: '1s' },
  { value: 2000, label: '2s' },
  { value: 5000, label: '5s' }
];

const headersPresetsOptions = [
  { value: 'JSON', label: 'JSON' },
  { value: 'XML', label: 'XML' },
  { value: 'TEXT', label: 'TEXT' }
];

class QuickEdit extends React.Component {
  constructor() {
    super();

    this.selectRequest         = this.selectRequest.bind(this);
    this.selectPreviousRequest = this.selectPreviousRequest.bind(this);
    this.selectNextRequest     = this.selectNextRequest.bind(this);
  }

  get selectedRequestIndex() {
    return _.findIndex(this.props.API.capturedRequests, {
      id: this.props.selectedRequestId
    });
  }

  get isFirstCapturedRequest() {
    return this.selectedRequestIndex === 0;
  }

  get isLastCapturedRequest() {
    return this.selectedRequestIndex === this.props.API.capturedRequests.length - 1;
  }

  selectRequest(event) {
    this.props.onSelectRequest(event.target.value);
  }

  selectPreviousRequest() {
    if (this.isFirstCapturedRequest) {
      return;
    }

    const previousRequest = this.props.API.capturedRequests[this.selectedRequestIndex - 1];

    this.props.onSelectRequest(previousRequest.id);
  }

  selectNextRequest() {
    if (this.isLastCapturedRequest) {
      return;
    }

    const nextRequest = this.props.API.capturedRequests[this.selectedRequestIndex + 1];

    this.props.onSelectRequest(nextRequest.id);
  }

  render() {
    return (
      <div style={ containerStyle }>
        <div style={ this.isFirstCapturedRequest ? disabledArrowSectionStyle : arrowSectionStyle }
             onClick={ this.selectPreviousRequest }>
          <img src={ leftIcon } style={ iconStyle } alt="Previous Request"/>
        </div>

        <div style={ this.isLastCapturedRequest ? disabledArrowSectionStyle : arrowSectionStyle }
             onClick={ this.selectNextRequest }>
          <img src={ rightIcon } style={ iconStyle } alt="Next Request"/>
        </div>

        <div style={ sectionStyle }>
          <select onChange={ this.selectRequest } value={ this.props.selectedRequestId }>
            {
              this.props.API.capturedRequests.map((request) => (
                <option key={ request.id } value={ request.id }>
                  { request.method } { request.url }
                </option>
              ))
            }
          </select>
          <img src={ selectIcon } style={ iconStyle } alt="Select"/>
        </div>

        <div style={ sectionStyle }>
          <input type="checkbox"/>
          <CompactSelect options={ _.values(HttpStatus).map((statusCode) => ({
            value: statusCode,
            label: statusCode
          })) }/>
        </div>

        <div style={ sectionStyle }>
          <CompactSelect options={ headersPresetsOptions }/>
        </div>

        <div style={ responseBodySectionStyle }>
          <input type="text"
                 style={ responseBodyInputStyle }
                 placeholder="Response Body"/>
        </div>

        <div style={ sectionStyle }>
          <img src={ stopwatchIcon } style={ iconStyle } alt="Response Delay"/>
          <CompactSelect options={ delayOptions }/>
        </div>

        <div style={ sectionStyle }>
          <div style={ applyButtonStyle }
               onClick={ this.props.onSave }>
            Apply
          </div>

          <img src={ tuneIcon } style={ iconStyle } alt="Tune Response"/>
        </div>
      </div>
    );
  }
}

export default QuickEdit;