import { useStoreActions, useStoreState } from "../../../hooks";
import { useTheme } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import GridUnit from "./GridUnit";
import { MapSubTopic } from "../../../enums";
import { FilterOption } from "../../../model/types";
import Tooltip from "@material-ui/core/Tooltip";

interface GridRowProps {
  count: number;
  filter: FilterOption;
  icon: JSX.Element;
}

const GridRow = ({ count, icon, filter }: GridRowProps) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const activeFilterState = useStoreState(
    (state) => state.studentsModel.filter
  );
  const setFilterAction = useStoreActions(
    (actions) => actions.studentsModel.thunkSetFilter
  );

  useEffect(() => {}, [activeFilterState]);
  // useEffect(()=>{
  // },[activeFilterState]);
  const setRowColor = (
    currentFilter: FilterOption[],
    rowIsHovered: boolean
  ) => {
    if (currentFilter.some((f) => f == filter)) {
      return 4;
    } else {
      return rowIsHovered ? 4 : 0;
    }
  };

  const rowGridStyle = {
    width: "100%",
    display: "flex",
    // display: "grid",
    // gridTemplateColumns: `repeat(${count + 1}, 1fr)`,
    // gridAutoRows: 20,
    // gridAutoFlow: "column",
  } as React.CSSProperties;

  return (
    <Tooltip title={filterToToolTip(filter)}>
      <div
        style={rowGridStyle}
        onMouseEnter={() => setHovered(!hovered)}
        onMouseLeave={() => setHovered(!hovered)}
        onMouseUp={() => {
          setFilterAction(filter);
        }}
      >
        {Array.from(Array(count)).map((r, i) => {
          console.log(count);
          console.log(i);
          return (
            <div style={{ paddingRight: "0.25em" }} key={i}>
              <GridUnit
                key={i}
                color={setRowColor(activeFilterState, hovered)}
                isActiveFilter={activeFilterState.some((f) => f == filter)}
                index={i}
              ></GridUnit>
            </div>
          );
        })}
        {icon}
      </div>
    </Tooltip>
  );
};

export default GridRow;

function filterToToolTip(filter: FilterOption): string {
  let tooltipText;
  switch (filter) {
    case MapSubTopic.BUILDINGS:
      tooltipText = "Buildings";
      break;
    case MapSubTopic.TRANSPORTATION:
      tooltipText = "Transportation";
      break;
    case MapSubTopic.INFRASTR:
      tooltipText = "Infrastructure";
      break;
    case MapSubTopic.PROPERTY:
      tooltipText = "Property";
      break;
    case MapSubTopic.URBANDEV:
      tooltipText = "Urban Development";
      break;
    case MapSubTopic.WORK:
      tooltipText = "Work";
      break;
    case MapSubTopic.GREENSPACE:
      tooltipText = "Greenspace";
      break;
    case MapSubTopic.POLLUTION:
      tooltipText = "Pollution";
      break;
    case MapSubTopic.HYDROLOGY:
      tooltipText = "Hydrology";
      break;
    case MapSubTopic.GOVERMENT:
      tooltipText = "Government";
      break;
    case MapSubTopic.POLICY:
      tooltipText = "Policy";
      break;
    case MapSubTopic.CIVICENG:
      tooltipText = "Civic Engagment";
      break;
    case MapSubTopic.EDUCATION:
      tooltipText = "Education";
      break;
    case MapSubTopic.HEALTHSAFETY:
      tooltipText = "Health";
      break;
    case MapSubTopic.RACEGEN:
      tooltipText = "Race and Gender";
      break;
    default:
      tooltipText = "Default";
  }
  return tooltipText;
}
