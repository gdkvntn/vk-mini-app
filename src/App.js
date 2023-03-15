import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import Friends from "./panels/Friends";

const App = () => {
  const [activePanel, setActivePanel] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [fetchedFriends, setFriends] = useState([]);
  const [popout, setPopout] = useState(<ScreenSpinner />);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }

    async function fetchFriends() {
      try {
        const { access_token } = await bridge.send("VKWebAppGetAuthToken", {
          app_id: 51580498,
          scope: "friends",
        });

        if (access_token) {
          bridge
            .send("VKWebAppCallAPIMethod", {
              method: "friends.get",
              params: {
                v: "5.131",
                access_token: access_token,
                fields: "photo_200_orig,city",
              },
            })
            .then((data) => {
              if (data.response) {
                setFriends(data.response.items);
              }
            })

            .catch((error) => {
              console.log(error);
            });
        }
      } catch {
        console.log(error);
      }
    }

    fetchData();
    fetchFriends();
  }, []);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home
                  id="home"
                  fetchedUser={fetchedUser}
                  go={go}
                  setPopout={setPopout}
                />
                <Friends id="friends" go={go} friends={fetchedFriends} />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
