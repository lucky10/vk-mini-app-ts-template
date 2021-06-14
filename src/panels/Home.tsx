import React from "react";

import { UserInfo } from "@vkontakte/vk-bridge";
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
} from "@vkontakte/vkui";

type Props = {
  id: string;
  go?: React.MouseEventHandler<HTMLElement>;
  fetchedUser?: UserInfo;
};

const Home: React.FC<Props> = ({ id, go, fetchedUser }) => (
  <Panel id={id}>
    <PanelHeader>Example</PanelHeader>
    {fetchedUser && (
      <Group
        header={
          <Header mode="secondary">User Data Fetched with VK Bridge</Header>
        }
      >
        <Cell
          before={
            fetchedUser.photo_200 ? (
              <Avatar src={fetchedUser.photo_200} />
            ) : null
          }
          description={
            fetchedUser.city && fetchedUser.city.title
              ? fetchedUser.city.title
              : ""
          }
        >
          {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
        </Cell>
      </Group>
    )}

    <Group header={<Header mode="secondary">Navigation Example</Header>}>
      <Div>
        <Button
          stretched
          size="l"
          mode="secondary"
          onClick={(e) => {
            console.log("DEBUG");
            go?.(e);
          }}
          data-to="persik"
        >
          Show me the Persik, please
        </Button>
      </Div>
    </Group>
  </Panel>
);

export default Home;
