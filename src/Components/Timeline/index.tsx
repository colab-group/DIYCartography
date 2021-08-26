// https://codesandbox.io/s/l28vmvp2n9?from-embed
import "../../css/timeline.css";
import ChartContainer from "./TimeSeries/components/ChartContainer";
import ChartRow from "./TimeSeries/components/ChartRow";
import Charts from "./TimeSeries/components/Charts";
import EventChart from "./TimeSeries/components/EventChart";
import EventInfoDisplay from "./EventInfoDisplay";
import Grid from "@material-ui/core/Grid";
import Resizable from "./TimeSeries/components/Resizable";
import type { EventRowValues } from "../../model/timelineModel";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Text } from "evergreen-ui";
import { TimeSeries } from "pondjs";
import { useState, useEffect, useRef } from "react";
import { useStoreState } from "../../hooks";
import { useTheme, Theme } from "@material-ui/core/styles";
import timelineRange from "../../static/timelineRange";

interface Separator {
  pos: number;
  name: string;
}

const Timeline = (): JSX.Element => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const timelineOffset = "6em";
  const initialWidth = 2000;

  const timeSeries = useStoreState((state) => state.timeline.timelineSeries);
  const eventRows: EventRowValues[] = useStoreState(
    (state) => state.timeline.eventSpreadsheet
  );

  const [eventInfo, setEventInfo] = useState<EventRowValues | undefined>(
    undefined
  );
  const [resizeWidth, setResizeWidth] = useState(initialWidth);
  const [selectedEvent, setSelectedEvent] = useState<TimeSeries | undefined>(
    undefined
  );
  const [separators, setSeparators] = useState<Separator[]>([]);

  //use this ref for resizing the timeline
  const timelineContainer = useRef<HTMLDivElement | null>(null);

  //height in pixels of the event series rows
  const rowHeight = 15;

  useEffect(() => {
    let tot = 0;
    Object.values(timeSeries).forEach((f) => {
      tot += f.length;
    });

    const separators: Separator[] = [];
    const keys = Object.keys(timeSeries);

    if (tot > 0) {
      let top = 1.0;
      Object.values(timeSeries).forEach((f, i) => {
        top -= f.length / tot;
        const sep = {
          pos: top,
          name: keys[i],
        } as Separator;
        separators.push(sep);
      });
      setSeparators(separators);
    }
  }, [timeSeries]);
  useEffect(() => {}, [separators]);

  const timelineSection = {
    height: "10%",
    width: "100%",
    borderTop: `1px solid ${theme.palette.primary.main}`,
    display: isSm ? "inline-flex" : "none",
    paddingTop: "1em",
  } as React.CSSProperties;

  useEffect(() => {
    const test = timelineContainer?.current?.style?.width;
    setResizeWidth(parseInt(test ?? "2000"));
  }, [timelineContainer]);

  const linesContainer = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    zIndex: -1,
    opacity: 1.0,
    textAlign: "right",
  } as React.CSSProperties;

  const separatorText = {
    fontSize: "12px",
    position: "absolute",
    marginTop: -6,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.primary.main,
    textAlign: "right",
  } as React.CSSProperties;

  const timeAxis = {
    axis: {
      stroke: theme.palette.primary.main,
    },
  };

  const makeTimeSeriesArr = (
    series: TimeSeries[],
    theme: Theme,
    rowHeight: number
  ) => {
    return series.map(function (ev, i) {
      const baseEventStyle = {
        fill: theme.palette.primary.main,
        opacity: 1.0,
      };

      function getEventMarkerStyle(s: any, state: any) {
        let style: React.CSSProperties;

        style = baseEventStyle;
        if (s.data().first().get("title") === selectedEvent) {
          style = {
            fill: theme.palette.primary.light,
            opacity: 1.0,
            fontFamily: theme.typography.fontFamily,
          };
        }
        return style;
      }
      function getEventTitle(e: any) {
        return e.data().first().get("title");
      }
      function handleClick(e: any) {
        const title = e.data().first().get("title");
        const clickedRow = eventRows.filter((r) => r.title === title)[0];
        setEventInfo(clickedRow);
        setSelectedEvent(title);
      }
      return (
        <ChartRow
          height={`${rowHeight}`}
          style={{ fill: "#f1a340" }}
          key={i}
          axisMargin={1}
        >
          <Charts>
            <EventChart
              series={ev}
              size={rowHeight}
              label={(e: any) => getEventTitle(e)}
              onSelectionChange={(e: any) => handleClick(e)}
              textOffsetY={-5}
              style={getEventMarkerStyle}
            ></EventChart>
          </Charts>
        </ChartRow>
      );
    });
  };

  return (
    <Grid container spacing={0} style={timelineSection}>
      <Grid item xs={2} className="event info grid container">
        <EventInfoDisplay info={eventInfo}></EventInfoDisplay>
      </Grid>
      <Grid item xs={10} className="timeline grid container">
        <div style={{ position: "relative", height: "200px" }}>
          <div style={linesContainer}>
            {separators.map((sep, i) => {
              return (
                <div
                  key={i}
                  //temporary fix for setting the position of the separators
                  style={{
                    textAlign: "right",
                    top: i == 0 ? "20%" : i == 1 ? "58%" : i == 2 ? "66%" : "0",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      borderTop:
                        i !== 2
                          ? `1px solid ${theme.palette.primary.main}`
                          : "none",
                      position: "relative",
                      marginLeft: timelineOffset,
                    }}
                  ></div>
                  <div
                    style={{
                      width: 100,
                      marginLeft: "-6em",
                    }}
                  >
                    <Text key={i} style={separatorText}>
                      {sep.name.toUpperCase()}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              height: "100%",
              width: "1000",
              marginLeft: "6em",
              overflow: "hidden",
            }}
            ref={timelineContainer}
          >
            <Resizable width={resizeWidth}>
              <ChartContainer
                timeRange={timelineRange}
                enablePanZoom={false}
                showGrid={true}
                timeAxisStyle={timeAxis}
                timeAxisTickCount={5}
              >
                {makeTimeSeriesArr(timeSeries.national, theme, rowHeight)}
                {makeTimeSeriesArr(timeSeries.state, theme, rowHeight)}
                {makeTimeSeriesArr(timeSeries.city, theme, rowHeight)}
              </ChartContainer>
            </Resizable>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Timeline;
