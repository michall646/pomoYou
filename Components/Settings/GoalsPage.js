import { ScrollView } from "react-native"
import { Text } from "react-native-paper"
import NumberPicker from "./NumberPicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GoalsPage = (props) => {
    const t = props.t;
    const handleGoalChange = (value, mode) => {
        const copy = {...props.settings};
        copy.goal = value * 60;
        props.setSettings(copy);
        AsyncStorage.setItem("Settings", JSON.stringify(copy));
    }
    return (
        <ScrollView contentContainerStyle={{padding: 10, paddingTop: 10}}>
            <Text variant='titleLarge' style={{marginBottom: 10}}>{t("dailyGoal")}</Text>
            <NumberPicker change={handleGoalChange} mode={0} t={t} start={props.settings.goal / 60}/>
        </ScrollView>
    )
}
export default GoalsPage