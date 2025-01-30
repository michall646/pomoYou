import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import {Text} from 'react-native-paper';
import TimerMode from "./Timer/TimerMode";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsMode from "./Settings/SettingsMode";
import StatisticsMode from "./Statistics/StatisticsMode";

const Tab = createMaterialBottomTabNavigator();
const Tabs = (props) => {
  const t = props.t;
  return (
      
      <Tab.Navigator>
        <Tab.Screen 
          name="Watch"
          options={{
            tabBarLabel: t("timerPageTitle"),
            tabBarIcon: ({ color, focused }) => {
              let icon = focused ? "timer" : "timer-outline";
              return (
                <MaterialCommunityIcons
                  name={icon}
                  color={color}
                  size={26}
                />
              );
            },
          }}
          >
            {()=> <TimerMode
                    settings={props.settings}
                    statistics={props.statistics}
                    setStatistics={props.setStatistics}
                    t={props.t}
                  />}
        </Tab.Screen>
        <Tab.Screen 
          name="Statistics"
          options={{
            tabBarLabel: t("statisticsPageTitle"),
            tabBarIcon: ({ color, focused }) => {
              let icon = focused ? "chart-box" : "chart-box-outline";
              return (
                <MaterialCommunityIcons
                  name={icon}
                  color={color}
                  size={26}
                />
              );
            },
          }}
          >
            {()=> <StatisticsMode
                    settings={props.settings}
                    statistics={props.statistics}
                    setStatistics={props.setStatistics}
                    t={props.t}
                  />}
        </Tab.Screen>
        <Tab.Screen 
          name="Settings"
          options={{
            tabBarLabel: t("settingsPageTitle"),
            tabBarIcon: ({ color, focused }) => {
              let icon = focused ? "cog" : "cog-outline";
              return (
                <MaterialCommunityIcons
                  name={icon}
                  color={color}
                  size={26}
                />
              );
            },
          }}
          >
            {()=> <SettingsMode t={props.t} settings={props.settings} setSettings={props.setSettings}/>}
        </Tab.Screen>
      </Tab.Navigator>
    
  );
};
export default Tabs
