import React from "react";
import { useImperativeHandle, useState } from "react";

interface CalendarProps {
  value: Date;
  onDateChange?: (date: Date) => void;
}
interface CalendarRef {
  getDate: () => Date,
  setDate: (date: Date) => void,
}
const InnerCalendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (props, ref) => {
  const { value, onDateChange } = props;
  useImperativeHandle(ref, () => {
    return {
      getDate: () => {
        return value;
      },
      setDate: (date: Date) => {
        setDate(date)
      }
    }
  })
  const monthNames = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];

  const [date, setDate] = useState(value);

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };
  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const days = [];

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = onDateChange?.bind(null, new Date(date.getFullYear(), date.getMonth(), i));

      if (date.getDate() === i) {
        days.push(
          <div key={i} onClick={clickHandler} className="day selected">
            {i}
          </div>
        );
      } else {
        days.push(
          <div key={i} onClick={clickHandler} className="day ">
            {i}
          </div>
        );
      }
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()} 年 {monthNames[date.getMonth()]}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDays()}
      </div>
    </div>
  );
};

const Calendar = React.forwardRef<CalendarRef, CalendarProps>(InnerCalendar)

export default Calendar;