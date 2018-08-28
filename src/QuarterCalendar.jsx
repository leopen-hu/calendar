import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import KeyCode from 'rc-util/lib/KeyCode';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from './calendar/CalendarFooter';
import CalendarMixin from './mixin/CalendarMixin';
import CommonMixin from './mixin/CommonMixin';

const MonthCalendar = createReactClass({
  propTypes: {
    monthCellRender: PropTypes.func,
    dateCellRender: PropTypes.func,
  },
  mixins: [CommonMixin, CalendarMixin],

  getInitialState() {
    return { mode: 'quarter' };
  },

  onKeyDown(event) {
    const keyCode = event.keyCode;
    const stateValue = this.state.value;
    const { disabledDate } = this.props;
    let value = stateValue;
    switch (keyCode) {
      case KeyCode.DOWN:
        value = stateValue.clone();
        value.add(3, 'months');
        break;
      case KeyCode.UP:
        value = stateValue.clone();
        value.add(-3, 'months');
        break;
      case KeyCode.ENTER:
        if (!disabledDate || !disabledDate(stateValue)) {
          this.onSelect(stateValue);
        }
        event.preventDefault();
        return 1;
      default:
        return undefined;
    }
    if (value !== stateValue) {
      this.setValue(value);
      event.preventDefault();
      return 1;
    }
  },

  handlePanelChange(_, mode) {
    if (mode !== 'date') {
      this.setState({ mode });
    }
  },

  render() {
    const { props, state } = this;
    const { mode, value } = state;
    const children = (
      <div className={`${props.prefixCls}-quarter-calendar-content`}>
        <div
          className={`${props.prefixCls}-quarter-header-wrap`}
          style={{ height: mode === 'quarter' ? 200 : 308 }}
        >
          <CalendarHeader
            prefixCls={props.prefixCls}
            mode={mode}
            value={value}
            locale={props.locale}
            disabledQuarter={props.disabledDate}
            quarterCellRender={props.quarterCellRender}
            quarterCellContentRender={props.quarterCellContentRender}
            onQuarterSelect={this.onSelect}
            onValueChange={this.setValue}
            onPanelChange={this.handlePanelChange}
          />
        </div>
        <CalendarFooter
          prefixCls={props.prefixCls}
          renderFooter={props.renderFooter}
        />
      </div>
    );
    return this.renderRoot({
      className: `${props.prefixCls}-quarter-calendar`,
      children,
    });
  },
});

export default MonthCalendar;
