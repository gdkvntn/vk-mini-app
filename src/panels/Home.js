import React from "react";
import PropTypes from "prop-types";

import {
  Panel,
  PanelHeader,
  Header,
  Group,
  Cell,
  Div,
  Avatar,
} from "@vkontakte/vkui";
import { Icon16Users } from "@vkontakte/icons";

const Home = ({ id, go, fetchedUser, setPopout }) => (
  <Panel id={id}>
    <PanelHeader>Info user</PanelHeader>
    {fetchedUser && (
      <Group>
        <Cell
          before={
            fetchedUser.photo_200 ? (
              <Avatar src={fetchedUser.photo_200} />
            ) : null
          }
          subtitle={
            fetchedUser.city && fetchedUser.city.title
              ? fetchedUser.city.title
              : ""
          }
        >
          {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
        </Cell>
      </Group>
    )}

    <Group header={<Header mode="secondary">Navigation</Header>}>
      <Cell expandable before={<Icon16Users />} onClick={go} data-to="friends">
        Friends
      </Cell>
    </Group>
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  setPopout: PropTypes.func.isRequired,
};

export default Home;
