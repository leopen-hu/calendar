/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/src/Picker';
import zhCN from 'rc-calendar/src/locale/zh_CN';
import enUS from 'rc-calendar/src/locale/en_US';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY';
const cn = location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const style = `
.year-calendar {
  width: 286px;
}

.year-calendar .rc-calendar-tbody > tr:hover
.rc-calendar-selected-day .rc-calendar-date {
    background: #3fc7fa;
}
`;

class Demo extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.object,
    defaultCalendarValue: PropTypes.object,
  };

  state = {
    value: undefined,
    open: false,
  };

  onChange = (value) => {
    console.log('DatePicker change: ', value && value.format(format));
    this.setState({
      value,
    });
  };

  onOpenChange = (open) => {
    this.setState({
      open,
    });
  };

  onPanelChange = (value, mode) => {
    console.log('onPanelChange - 2', value, mode);
    if (!mode) {
      this.onOpenChange(!this.state.open);
    }
  };

  render() {
    const state = this.state;
    const calendar = (
      <Calendar
        className="year-calendar"
        mode="year"
        locale={cn ? zhCN : enUS}
        format={format}
        style={{ zIndex: 1000 }}
        defaultValue={now}
        showDateInput={false}
        onChange={this.onChange}
        onPanelChange={this.onPanelChange}
      />
    );
    return (
      <div style={{ width: 400, margin: 20 }}>
        <div
          style={{
            boxSizing: 'border-box',
            position: 'relative',
            display: 'block',
            lineHeight: 1.5,
            marginBottom: 22,
          }}
        >
          <DatePicker
            onOpenChange={this.onOpenChange}
            open={this.state.open}
            animation="slide-up"
            calendar={calendar}
            value={state.value}
            onChange={this.onChange}
          >
            {({ value }) => {
              return (
                <span tabIndex="0">
                  <input
                    placeholder="please select year"
                    style={{ width: 150 }}
                    disabled={state.disabled}
                    readOnly
                    tabIndex="-1"
                    className="ant-calendar-picker-input ant-input"
                    value={(value && value.format(format)) || ''}
                  />
                </span>
              );
            }}
          </DatePicker>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <div
    style={{
      zIndex: 1000,
      position: 'relative',
      width: 900,
      margin: '20px auto',
    }}
  >
    <style dangerouslySetInnerHTML={{ __html: style }} />
    <div>
      <Demo />
    </div>
  </div>,
  document.getElementById('__react-content')
);
