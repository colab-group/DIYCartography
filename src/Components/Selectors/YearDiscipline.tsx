// import Grid from '@material-ui/core/Grid';
import {Paragraph, Text} from 'evergreen-ui';
import { useTheme, withStyles } from "@material-ui/core/styles";
import SelectorGroup from './Containers/SelectorGroup';
import SelectorParent from './Containers/SelectorParent';
import GridChunk from './Grid/GridChunk';
import GridUnit from './Grid/GridUnit';
import { useStoreState } from "../../hooks";
import {AuthorDisciplineFilter} from '../../model/enums';

const YearDiscipline = () => {
    const theme = useTheme();
    const year_data = useStoreState(state=>state.map_data?.map_stats?.year);
    console.log(year_data);

    const chunksContainer = {
        // position: 'relative',
        display: 'flex',
        height: '51px',

    } as React.CSSProperties;

    const disciplineStyle = {
        color: theme.palette.primary.main,
        fontSize: '8pt',
        justifyContent: 'space-between',
    
    } as React.CSSProperties
    const rowContainer = {
        display: 'flex',
        fontSize: '8pt'

        // : 'center',
    } as React.CSSProperties
    const make_year_chunks = (year_breakdown?: any) =>{
        if (year_breakdown){
            return (
                <div style = {chunksContainer}>
                    <GridChunk base_color = {0} count = {year_breakdown.ARCHITECTURE} filter = {AuthorDisciplineFilter.ARCHITECTURE}/>
                    <GridChunk base_color = {1} count = {year_breakdown.ARTDESIGN} filter = {AuthorDisciplineFilter.ARTDESIGN}/>
                    <GridChunk base_color = {2} count = {year_breakdown.LANDSCAPE} filter = {AuthorDisciplineFilter.LANDSCAPE}/>
                    <GridChunk base_color = {3} count = {year_breakdown.OTHER} filter = {AuthorDisciplineFilter.OTHER}/>
                </div>
                )
        }
    }
    return (
       <>
        <SelectorParent>
            <SelectorGroup title = {null} size = {3}>
                <div style = {rowContainer}>
                    <GridUnit color = {0}/>
                    <Paragraph style = {disciplineStyle}>ARCHITECTURE</Paragraph>
                </div>
                <div style = {rowContainer}>
                    <GridUnit color = {1}/>
                    <Text style = {disciplineStyle}>
                        <Paragraph style = {disciplineStyle}>LANDSCAPE ARCH</Paragraph>
                    </Text>
                </div>
                <div style = {rowContainer}>
                    <GridUnit color = {2}/>
                    <Paragraph style = {disciplineStyle}>ART + DESIGN</Paragraph>
                </div>
                <div style = {rowContainer}>
                    <GridUnit color = {3}/>
                    <Paragraph style = {disciplineStyle}>OTHER</Paragraph>
                </div>
            </SelectorGroup>
            <SelectorGroup title = {"2016"} size = {3}>
                {
                    make_year_chunks(year_data["2018"])
                }
            </SelectorGroup>
            <SelectorGroup title = {"2018"} size = {3}>
            {
                    make_year_chunks(year_data["2018"])
                }
            </SelectorGroup>
            <SelectorGroup title = {"2020"} size = {3}>
            {
                    make_year_chunks(year_data["2020"])
                }
            </SelectorGroup>
        </SelectorParent>
      </>
    )

}

export default YearDiscipline;