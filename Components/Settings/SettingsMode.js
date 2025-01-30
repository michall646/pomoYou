import ListItem from "./ListItem"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesView from "./CategoriesView";
import ApperancePage from "./ApperancePage";
import LanguagePage from "./LanguagePage";
import TimerPage from "./TimerPage";
import GoalsPage from "./GoalsPage";

const Stack = createNativeStackNavigator();



const SettingsMode = (props) => {
    const t = props.t;
    return (
        <Stack.Navigator>
        <Stack.Screen name="Categories" options={{ title: t("settingsPageTitle")}}>
        {() =>( <CategoriesView
           t={t}
          
          />)}
        </Stack.Screen>
        <Stack.Screen name="Apperance" options={{ title: t("apperancePageTitle")}}>
        {() =>( <ApperancePage
           t={t}
           settings={props.settings}
           setSettings={props.setSettings}
          
          />)}
        </Stack.Screen>
        <Stack.Screen name="Language" options={{ title: t("languagePageTitle")}}>
        {() =>( <LanguagePage
           t={t}
           settings={props.settings}
           setSettings={props.setSettings}
          
          />)}
        </Stack.Screen>
        <Stack.Screen name="Timer" options={{ title: t("timerPageTitle")}}>
        {() =>( <TimerPage
           t={t}
           settings={props.settings}
           setSettings={props.setSettings}
          
          />)}
        </Stack.Screen>
        <Stack.Screen name="Goals" options={{ title: t("goalsPageTitle")}}>
        {() =>( <GoalsPage
           t={t}
           settings={props.settings}
           setSettings={props.setSettings}
          
          />)}
        </Stack.Screen>
        
        </Stack.Navigator>
    )
}
export default SettingsMode