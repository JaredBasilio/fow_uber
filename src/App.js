import logo from './logo.svg';
import * as React from "react";
import './App.css';
import { Button, SIZE} from "baseui/button";
import {Block} from "baseui/block";
import ReactMapGL, { Marker } from "react-map-gl";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import { FixedMarker } from "baseui/map-marker";
import { StyledLink } from "baseui/link";
import {
  HeadingXSmall,
  ParagraphLarge,
} from "baseui/typography";
import { ToasterContainer, toaster, PLACEMENT, Toast} from 'baseui/toast';

const berkeley = {
  latitude: 37.8715,
  longitude: -122.2730,
};

const sf = {
  latitude: 37.77449,
  longitude: -122.41946,
};

const initialViewport = {
  ...berkeley,
  ...sf,
  zoom: 14,
};

const center = {
  lat: 0,
  lng: 0
};

export function Game() {
  return 
    <>
    </>
}

export default function App() {
  const [job, setJob] = React.useState('Driver');
  const [leisure, setLeisure] = React.useState(false);
  const [leisureTime, setLeisureTime] = React.useState(0);
  const [viewport, setViewport] = React.useState(initialViewport);
  const [game, setGame] = React.useState(false);
  const [totalTime, setTotalTime] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);

  let toastKey;
  const msg = "Job from Berkeley to SF";

  const SwitchJob = () => {
    if (job === 'Driver') {
      setJob('Eater');
    } else {
      setJob('Driver');
    }
  }

  return (
    <React.Fragment>
      {playing ? 
      <Block>
        <HeaderNavigation>
          <StyledNavigationList $align={ALIGN.left}>
            <StyledNavigationItem>
              <Button onClick={() => {
                setLeisure(leisure ^ true);
              }}>Switch to Leisure</Button>
            </StyledNavigationItem>
          </StyledNavigationList>
          <StyledNavigationList $align={ALIGN.center}>
            <StyledNavigationItem>
              <Button onClick={SwitchJob}>Switch to {job}</Button>
            </StyledNavigationItem>
          </StyledNavigationList>
          <StyledNavigationList $align={ALIGN.right}>
            <StyledNavigationItem>
              <Button onClick={() => {
                setPlaying(false);
              }}>End Game</Button>
            </StyledNavigationItem>
          </StyledNavigationList>
        </HeaderNavigation>
          <Block display="flex" height="100vh" width="width=100%">
          <Block width="20%" padding="1em">
            <HeadingXSmall padding="0">Total Time: {totalTime}</HeadingXSmall>
            <HeadingXSmall padding="0">Total Leisure Time: {leisureTime}</HeadingXSmall>
          </Block>
          <ToasterContainer placement={PLACEMENT.bottomRight}></ToasterContainer>
          <Block width="80%">
          {game ? 
            <Game />
          :
            <ReactMapGL
              {...viewport}
              width="100%"
              height="100%"
              onViewportChange={(viewport) => setViewport(viewport)}
              mapboxApiAccessToken="pk.eyJ1IjoiYmFiYnN1YmVyIiwiYSI6ImNrdThqeGkxZTVwb3kyd3BpZGRlc2NlOXUifQ.qh-EtXm2DJQZVprWUJ-GFQ" // TODO Change Later
            >
              <Marker {...berkeley}>
                <FixedMarker
                  label="Berkeley"
                  overrides={{
                    Root: {
                      style: () => ({
                        transform: `translate(-50%, -100%)`,
                      }),
                    },
                  }}
                />
              </Marker>
              <Marker {...sf}>
                <FixedMarker
                  label="San Francisco"
                  overrides={{
                    Root: {
                      style: () => ({
                        transform: `translate(-50%, -100%)`,
                      }),
                    },
                  }}
                />
              </Marker>
            </ReactMapGL>
          }
          </Block>
        </Block>
      </Block>
      : 
      <>
        You are no Longer Playing
      </>
      }
    </React.Fragment>
  );
}