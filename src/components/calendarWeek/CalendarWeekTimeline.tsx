import styled from "styled-components";

export const CalendarWeekTimelineHour = styled.div`
  height: 60px;
  position: relative;
  border-top: 1px solid rgb(218, 220, 224);
  z-index: 4;
`;

export const CalendarWeekTimelineHourLabel = styled.span`
  display: block;
  position: relative;
  top: 0;
  z-index: 5;
  color: rgb(137, 137, 138);
`;

export const CalendarWeekTimelineWrapper = styled.div`
  height: 1440px;
  position: relative;
  width: 50px;
`;

export const CalendarWeekTimelineHead = styled.div`
  height: 15px;
  position: relative;
`;

export const CalendarWeekTimeline = () => {
  const generateHours = () => {
    let hours = [];
    for (let i = 1; i <= 12; i++) {
      hours.push(i + " AM");
    }
    for (let i = 1; i <= 12; i++) {
      hours.push(i + " PM");
    }
    return hours;
  };

  return (
    <CalendarWeekTimelineWrapper>
      <CalendarWeekTimelineHead />
      {generateHours().map((x, i) => {
        return (
          <CalendarWeekTimelineHour key={i}>
            <CalendarWeekTimelineHourLabel>{x}</CalendarWeekTimelineHourLabel>
          </CalendarWeekTimelineHour>
        );
      })}
    </CalendarWeekTimelineWrapper>
  );
};
