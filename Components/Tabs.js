import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {FAB, Text, useTheme} from 'react-native-paper';
import TimerMode from "./Timer/TimerMode";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsMode from "./Settings/SettingsMode";
import StatisticsMode from "./Statistics/StatisticsMode";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Dimensions} from 'react-native';
import { DrawerActions } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Tabs = (props) => {
  const t = props.t;
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  if(windowWidth> windowHeight) {
    return (<>
    <FAB
    icon="menu"
    style={{margin: 16, position: 'absolute', right: 0, top: 0, zIndex: 10}}
    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
  />
    <Drawer.Navigator screenOptions={{drawerActiveTintColor: theme.colors.primary, headerShown: false, drawerStyle: {backgroundColor: theme.colors.surface}}}>
      <Drawer.Screen 
          name="Timer"
          options={{
            drawerLabel: t("timerPageTitle"),
            
            drawerIcon: ({ color, focused }) => {
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
        </Drawer.Screen>
        <Drawer.Screen 
          name="Statistics"
          options={{
            drawerLabel: t("statisticsPageTitle"),
            drawerIcon: ({ color, focused }) => {
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
        </Drawer.Screen>
        <Drawer.Screen 
          name="Settings"
          options={{
            drawerLabel: t("settingsPageTitle"),
            drawerIcon: ({ color, focused }) => {
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
        </Drawer.Screen>
    </Drawer.Navigator> </>)
  }
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
