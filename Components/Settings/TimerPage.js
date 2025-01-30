import { ScrollView } from "react-native"
import { Switch, Text } from "react-native-paper"
import ListItem from "./ListItem"
import NumberPicker from "./NumberPicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
const TimerPage = (props) => {
    const t = props.t;
    const changeInterval = (value, mode) => {
        console.log(value, mode);
        const copy = {...props.settings};
        if(mode === 0){
            copy.pomodoriLength = Number(value) * 60;
            console.log("pomodori")
        }
        if(mode === 1){
            copy.shortBreakLength = Number(value) * 60;
        }
        if(mode === 2){
            copy.longBreakLength = Number(value) * 60;
        }
        console.log(copy)
        AsyncStorage.setItem("Settings", JSON.stringify(copy));
        props.setSettings(copy);
    }
    const [longBreaksEnabled, setLongBreaksEnabled] = useState(props.settings.longBreak);

    const handleLongBreaksSwitchChange = (value) =>{
        setLongBreaksEnabled(value);
        const copy = {...props.settings}
        copy.longBreak = value;
        props.setSettings(copy);
        AsyncStorage.setItem("Settings", JSON.stringify(copy));
    }

    const handleLongBreakFrequencyChange = (value, mode) => {
        const copy = {...props.settings}
        copy.longBreakFreq = value;
        props.setSettings(copy);
        AsyncStorage.setItem("Settings", JSON.stringify(copy));
    }
    console.log(props.settings.pomodoriLength);

    
    return (
        <ScrollView contentContainerStyle={{padding: 10, paddingTop: 10}}>
            <Text variant='titleLarge' style={{marginBottom: 10}}>{t("timeIntervals")}</Text>
            <ListItem
                title={t("pomodoriLength")}
                icon="cog"
                isRight={true}
                right={<NumberPicker change={changeInterval} t={t} mode={0} start={props.settings.pomodoriLength / 60}/>}
                onPress={() => {}}
            />
            <ListItem
                title={t("shortBreakLength")}
                icon="coffee"
                isRight={true}
                right={<NumberPicker change={changeInterval} t={t} mode={1} start={props.settings.shortBreakLength / 60}/>}
                onPress={() => {}}
            />
            <ListItem
                title={t("longBreakLength")}
                icon="umbrella-beach"
                isRight={true}
                right={<NumberPicker change={changeInterval} t={t} mode={2} start={props.settings.longBreakLength / 60}/>}
                onPress={() => {}}
            />
            <Text variant='titleLarge' style={{marginBottom: 10}}>{t("longBreaks")}</Text>
            <ListItem
                title={t("enableLongBreaks")}
                icon="alarm-check"
                isRight={true}
                right={<Switch value={longBreaksEnabled} onValueChange={handleLongBreaksSwitchChange}/>}
                onPress={() => {}}
            />
            <ListItem
                title={t("longBreakFrequency")}
                icon="repeat"
                isRight={true}
                right={<NumberPicker label={t("every")} change={handleLongBreakFrequencyChange} mode={2} start={props.settings.longBreakFreq}/>}
                onPress={() => {}}
            />
        </ScrollView>
    )
}
export default TimerPage