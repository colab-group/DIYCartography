import ReactDom from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";
import { useStoreState } from "../../hooks";
import MapDescription from "./MapDescription";
import ImageSlider from "./ImageSlider";
import Header from "./Header";

interface LightBoxProps {
  show: boolean;
  onClick: () => void;
}

const LightBox = ({ show, onClick }: LightBoxProps): JSX.Element => {
  const activeLightbox = useStoreState(
    (state) => state.studentsModel.activeLightBoxData
  );

  const galleryStyle = {
    height: "100%",
  };

  const backDropContainer = {
    height: "100%",
    paddingLeft: "2em",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    maxHeight: "100vh",
    overflow: "hidden",
    paddingTop: "1em",
  } as React.CSSProperties;

  const mainGrid = {
    height: "90vh",
    width: "100vw",
    spacing: 0,
    paddingTop: "1em",
    justify: "space-around",
  };

  const LimitedBackdrop = withStyles({
    root: {
      position: "absolute",
      zIndex: 1,
      boxSizing: "border-box",
      opacity: 0.5,
      backgroundColor: "rgb(0 0 0 / 73%)",
      overflow: "hidden",
      transition: "opacity 1s",
    },
  })(Backdrop);
  const { author, title, discipline, year, description, startImageIndex } = {
    ...activeLightbox,
  };
  return ReactDom.createPortal(
    <>
      <LimitedBackdrop open={show} transitionDuration={1000}>
        <div
          style={backDropContainer}
          onMouseUp={() => {
            onClick;
          }}
        >
          <Header
            author={author}
            title={title}
            discipline={discipline}
            year={year}
            onClick={onClick}
          />
          <Grid container spacing={3} style={mainGrid}>
            <Grid item xs={2} onClick={onClick}>
              <MapDescription description={description} />
            </Grid>
            <Grid item xs={9} style={galleryStyle}>
              <ImageSlider
                images={activeLightbox.images}
                startImageIndex={startImageIndex}
              />
            </Grid>
          </Grid>
        </div>
      </LimitedBackdrop>
    </>,
    document.getElementById("overlay") as HTMLImageElement
  );
};

export default LightBox;
