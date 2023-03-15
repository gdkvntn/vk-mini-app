import React from "react";
import PropTypes from "prop-types";

import {
  Avatar,
  Div,
  Group,
  IconButton,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  SimpleCell,
} from "@vkontakte/vkui";
import { Icon28MessageOutline } from "@vkontakte/icons";

const Friends = ({ id, go, friends }) => {
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={go} data-to="home" />}>
        Friends
      </PanelHeader>

      {friends.length ? (
        <Group>
          {friends.map((friend) => (
            <SimpleCell
              key={friend.id}
              before={<Avatar size={48} src={friend.photo_200_orig} />}
              after={
                <IconButton>
                  <Icon28MessageOutline />
                </IconButton>
              }
              subtitle={friend.city ? friend.city.title : ""}
            >
              {`${friend.first_name} ${friend.last_name}`}
            </SimpleCell>
          ))}
        </Group>
      ) : (
        <Div>No friends</Div>
      )}
    </Panel>
  );
};

Friends.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  friends: PropTypes.array.isRequired,
};

export default Friends;
