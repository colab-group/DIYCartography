// import Grid from '@material-ui/core/Grid';
import { useTheme, withStyles } from "@material-ui/core/styles";
import SelectorGroup from "./Containers/SelectorGroup";
import SelectorParent from "./Containers/SelectorParent";
import GridRow from "./Grid/GridRow";
import { useEffect } from "react";
import { MapSubTopic, FilterGroup } from "../../model/enums";

// import {}
// https://material-ui.com/components/material-icons/

import {
  LightbulbIcon,
  HomeIcon,
  ChartIcon,
  BriefcaseIcon,
  TreeIcon,
  SymbolCrossIcon,
  PeopleIcon,
} from "evergreen-ui";

import {
  DirectionsBus,
  Apartment,
  Opacity,
  Gavel,
  AccountBalance,
  VolumeUp,
  School,
} from "@material-ui/icons";

import { useStoreState } from "../../hooks";

const MapLens = () => {
  const theme = useTheme();
  const tag_stats = useStoreState((state) => state.map_data?.map_stats?.tag);
  const state_active_filters = useStoreState((state) => state.map_data.filter);
  // console.log(tag_stats);

  return (
    <>
      <SelectorParent columns={5}>
        <SelectorGroup
          title={"Built"}
          size={2}
          filter={FilterGroup.BUILT_TOPIC}
        >
          <GridRow
            filter={MapSubTopic.BE_INFRASTR}
            count={tag_stats.BE?.ENERGY}
            icon={
              <LightbulbIcon color={theme.palette.primary.main} size={12} />
            }
          ></GridRow>
          <GridRow
            filter={MapSubTopic.BE_BUILDINGS}
            count={tag_stats.BE?.HOUSING}
            icon={<Apartment color={"primary"} style={{ fontSize: "12pt" }} />}
          ></GridRow>
          <GridRow
            filter={MapSubTopic.BE_TRANSPORTATION}
            count={tag_stats.BE?.TRANSPORTATION}
            icon={
              <DirectionsBus
                fontSize="small"
                color={"primary"}
                style={{ fontSize: "12pt" }}
              />
            }
          />
        </SelectorGroup>
        <SelectorGroup
          title={"Economic"}
          size={3}
          filter={FilterGroup.ECONOMIC_TOPIC}
        >
          <GridRow
            filter={MapSubTopic.EE_PROPERTY}
            count={tag_stats.EE?.COSTOFLIVING}
            icon={<HomeIcon color={theme.palette.primary.main} size={12} />}
          ></GridRow>
          <GridRow
            filter={MapSubTopic.EE_URBANDEV}
            count={tag_stats.EE?.URBANDEV}
            icon={<ChartIcon color={theme.palette.primary.main} size={12} />}
          ></GridRow>
          <GridRow
            filter={MapSubTopic.EE_WORK}
            count={tag_stats.EE?.EE_WORK}
            icon={
              <BriefcaseIcon color={theme.palette.primary.main} size={12} />
            }
          />
        </SelectorGroup>
        <SelectorGroup
          title={"Natural"}
          size={2}
          filter={FilterGroup.NATURAL_TOPIC}
        >
          <GridRow
            filter={MapSubTopic.NE_GREENSPACE}
            count={tag_stats.NE?.GREENSPACE}
            icon={<TreeIcon color={theme.palette.primary.main} size={12} />}
          ></GridRow>
          <GridRow
            filter={MapSubTopic.NE_POLLUTION}
            count={tag_stats.NE?.POLLUTION}
            icon={<ChartIcon color={theme.palette.primary.main} size={12} />}
          ></GridRow>
          <GridRow
            filter={MapSubTopic.NE_HYDROLOGY}
            count={tag_stats.NE?.NE_HYDROLOGY}
            icon={<Opacity color={"primary"} style={{ fontSize: "12pt" }} />}
          />
        </SelectorGroup>
        <SelectorGroup
          title={"Political"}
          size={3}
          filter={FilterGroup.POLITICAL_TOPIC}
        >
          <GridRow
            filter={MapSubTopic.PE_GOV}
            count={tag_stats.PE?.GOVERMENT}
            icon={
              <AccountBalance color={"primary"} style={{ fontSize: "12pt" }} />
            }
          ></GridRow>
          <GridRow
            filter={MapSubTopic.PE_POLICY}
            count={tag_stats.PE?.LEGISLATION}
            icon={<Gavel color={"primary"} style={{ fontSize: "12pt" }} />}
          ></GridRow>
          <GridRow
            filter={MapSubTopic.PE_CIVICENG}
            count={tag_stats.PE?.PE_CIVICENG}
            icon={<VolumeUp color={"primary"} style={{ fontSize: "12pt" }} />}
          />
        </SelectorGroup>
        <SelectorGroup
          title={"Social"}
          size={2}
          filter={FilterGroup.SOCIAL_TOPIC}
        >
          <GridRow
            filter={MapSubTopic.SE_EDUCATION}
            count={tag_stats.SE?.EDUCATION}
            icon={<School color={"primary"} style={{ fontSize: "12pt" }} />}
          ></GridRow>
          <GridRow
            filter={MapSubTopic.SE_HEALTH}
            count={tag_stats.SE?.HEALTH}
            icon={
              <SymbolCrossIcon color={theme.palette.primary.main} size={12} />
            }
          ></GridRow>
          <GridRow
            filter={MapSubTopic.SE_RACEGEN}
            count={tag_stats.SE?.POPULATION}
            icon={<PeopleIcon color={theme.palette.primary.main} size={12} />}
          />
        </SelectorGroup>
      </SelectorParent>
    </>
  );
};

export default MapLens;
