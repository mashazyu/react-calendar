import React, { Component } from 'react';
import PropTypes from 'prop-types';
import addMonths from 'date-fns/addMonths';
import isToday from 'date-fns/isToday';
import format from 'date-fns/format';
import subMonths from 'date-fns/subMonths';
import cx from 'classnames';

import createDateObjects from './createDateObjects';

export default class Calendar extends Component {
  static propTypes = {
    /** Week offset*/
    weekOffset: PropTypes.number.isRequired,
    /** The current date as a Date() objecct */
    date: PropTypes.object.isRequired,
    /** Function to render a day cell */
    renderDay: PropTypes.func,
    /** Function to render the header */
    renderHeader: PropTypes.func,
    /** Called on next month click */
    onNextMonth: PropTypes.func,
    /** Called on prev month click */
    onPrevMonth: PropTypes.func,
    /** Called when some of the navigation controls are clicked */
    onChangeMonth: PropTypes.func,
    /** Called when a date is clicked */
    onPickDate: PropTypes.func,
    /** classname for div wrapping the whole calendar */
    containerClassName: PropTypes.string,
    /** classname for the div wrapping the grid */
    contentClassName: PropTypes.string
  };

  static defaultProps = {
    weekOffset: 0,
    renderDay: ({ day, classNames, onPickDate }) => (
      <div
        key={day.toString()}
        className={cx(
          'Calendar-grid-item',
          isToday(day) && 'Calendar-grid-item--current',
          classNames
        )}
        onClick={e => onPickDate(day)}
      >
        {format(day, 'd')}
      </div>
    ),
    renderHeader: ({ date, onPrevMonth, onNextMonth }) => (
      <div className="Calendar-header">
        <button onClick={onPrevMonth}>«</button>
        <div className="Calendar-header-currentDate">
          {format(date, 'MMMM yyyy')}
        </div>
        <button onClick={onNextMonth}>»</button>
      </div>
    )
  };

  handleNextMonth = () => {
    if (this.props.onNextMonth) {
      return this.props.onNextMonth();
    }

    this.props.onChangeMonth(addMonths(this.props.date, 1));
  };

  handlePrevMonth = () => {
    if (this.props.onPrevMonth) {
      return this.props.onPrevMonth();
    }

    this.props.onChangeMonth(subMonths(this.props.date, 1));
  };

  render() {
    const {
      date,
      weekOffset,
      renderDay,
      renderHeader,
      onPickDate,
      contentClassName,
      containerClassName
    } = this.props;

    return (
      <div className={cx('Calendar', containerClassName)}>
        {renderHeader({
          date,
          onPrevMonth: this.handlePrevMonth,
          onNextMonth: this.handleNextMonth
        })}
        <div className={cx('Calendar-grid', contentClassName)}>
          {createDateObjects(date, weekOffset).map((day, i) =>
            renderDay({ ...day, onPickDate })
          )}
        </div>
      </div>
    );
  }
}
