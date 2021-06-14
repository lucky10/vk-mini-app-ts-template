import React from "react";

import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import persik from "../img/persik.png";
import "./Persik.css";

type Props = { id?: string; go?: React.MouseEventHandler<HTMLElement> };

const Persik: React.FC<Props> = (props) => (
  <Panel id={props.id}>
    <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to="home" />}>
      Persik
    </PanelHeader>
    <img className="Persik" src={persik} alt="Persik The Cat" />
  </Panel>
);
export default Persik;
