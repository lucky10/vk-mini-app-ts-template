import React, { useState, useEffect } from "react";
import bridge, {
  ReceiveDataMap,
  UserInfo,
  VKBridgeSubscribeHandler,
} from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import Persik from "./panels/Persik";

const DEFAULT_ACTIVE_PANEL = "home";

const App = () => {
  const [activePanel, setActivePanel] = useState<string>(DEFAULT_ACTIVE_PANEL);
  const [fetchedUser, setUser] = useState<UserInfo>();
  const [popout, setPopout] = useState<React.ReactElement | null>(
    <ScreenSpinner size="large" />
  );

  const fetchData = async () => {
    const user = await bridge.send("VKWebAppGetUserInfo");
    setUser(user);
    setPopout(null);
  };

  useEffect(() => {
    const bridgeEventListener: VKBridgeSubscribeHandler = (event) => {
      if (event.detail.type === "VKWebAppUpdateConfig") {
        const data = event.detail
          .data as ReceiveDataMap["VKWebAppUpdateConfig"];

        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    };

    bridge.subscribe(bridgeEventListener);

    fetchData();

    return () => bridge.unsubscribe(bridgeEventListener);
  }, []);

  const go: React.MouseEventHandler<HTMLElement> = (e) => {
    setActivePanel(e.currentTarget.dataset.to ?? DEFAULT_ACTIVE_PANEL);
  };

  return (
    <AdaptivityProvider>
      <AppRoot>
        <View activePanel={activePanel} popout={popout}>
          <Home id="home" fetchedUser={fetchedUser} go={go} />
          <Persik id="persik" go={go} />
        </View>
      </AppRoot>
    </AdaptivityProvider>
  );
};

export default App;
