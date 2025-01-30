import { View } from "react-native"
import Svg, { Circle } from 'react-native-svg'
import { Button, IconButton, Text, useTheme } from "react-native-paper"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {useEffect, useState } from "react"
import sendEndNotificationWeb from "../../Engine/sendEndNotification"
import { Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import sendEndNotificationAndroid from "../../Engine/sendEndNotificationAndroid"


const Timer = (props) => {
    const [pause, setPause] = useState(true);
    const [key, setKey] = useState(0);
    const [defaultTimes, setDefaultTimes] = useState([props.settings.pomodoriLength, props.settings.shortBreakLength, props.settings.longBreakLength]);
    const [duration, setDuration] = useState(defaultTimes[props.selectedMode]);
    const [modeNames, setModeNames] = useState(["Pomodori", "Short Break", "Long Break"]);
    const t =props.t;

    const theme = useTheme();

    const getFormatedTime = (seconds) => {
        if(seconds > 60){
            return Math.round(seconds / 60);
        }
        else{
            return seconds
        }
    }

    const getTimeDisc = (seconds) => {
        if(seconds > 60){
            return t("minLeft", {count: seconds})
        }
        else{
            return t("secLeft", {count: seconds})
        }
    }

    useEffect(()=> {
        setDuration(defaultTimes[props.selectedMode]);
        setKey(key +1);
        setPause(true);
        
        
    }, [props.selectedMode]);

    useEffect(()=> {
        setDefaultTimes([props.settings.pomodoriLength, props.settings.shortBreakLength, props.settings.longBreakLength])
        setDuration([props.settings.pomodoriLength, props.settings.shortBreakLength, props.settings.longBreakLength][props.selectedMode]);
    }, [props.settings])

    const handleCompletion = () => {
       
        
        if(props.selectedMode === 0){
            const copy = props.statistics.slice();
            copy.push({date: Date.now(), length: duration});
            console.log(copy);
            props.setStatistics(copy);
            AsyncStorage.setItem("Statistics", JSON.stringify(copy));
        }
        const nextMode = getNextMode(props.selectedMode, props.marks);
        if(Platform.OS === 'web'){
            sendEndNotificationWeb( `${modeNames[props.selectedMode]} ${t("isNowOver")}`, `${t("next")} ${modeNames[nextMode]}`);
        }
        if(Platform.OS === 'android'){
            sendEndNotificationAndroid( `${modeNames[props.selectedMode]} ${t("isNowOver")}`, `${t("next")} ${modeNames[nextMode]}`);
        }
        
        console.log(props.marks)
        
    }

    const getNextMode = (selected, marks) => {
        if(selected === 0){
            
            if(marks+ 1 === Number(props.settings.longBreakFreq) && props.settings.longBreak){
                props.setSelectedMode(2);
                props.setMarks(0);
                return 2;
            }
            else{
                props.setSelectedMode(1);
                props.setMarks(marks + 1);
                return 1;
                
            }
            
        }
        else{
            props.setSelectedMode(0);
            return 0;
        }
    }

    const PLAYICON = pause ? "play" : "pause";
    return (
        <CountdownCircleTimer
            isPlaying={!pause}
            duration={duration}
            colors={[theme.colors.primary, theme.colors.tertiary]}
            size={230}
            strokeWidth={15}
            key={key}
            onComplete={() => handleCompletion() }
      >
        {({ remainingTime }) => 
        
        <View style={{
            width: 200,
            height: 200,
            backgroundColor: theme.colors.primaryContainer,
            borderRadius: 100,
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text variant="displayLarge">{getFormatedTime(remainingTime)}</Text>
            <Text variant="bodyMedium">{getTimeDisc(remainingTime)}</Text>
            <View style={{
                width: 123,
                height: 45,
                borderRadius: 10,
                backgroundColor: theme.colors.secondary,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                <IconButton
                    icon="replay"
                    size={25}
                    iconColor={theme.colors.onSecondary}
                    onPress={() => setKey(key + 1)}
                    style={{margin: 0}}
                />
                <IconButton
                    icon={PLAYICON}
                    size={25}
                    iconColor={theme.colors.onSecondary}
                    onPress={() => setPause(!pause)}
                    style={{margin: 0}}
                />
                <IconButton
                    icon="plus"
                    size={25}
                    iconColor={theme.colors.onSecondary}
                    onPress={() => setDuration(duration+ 300)}
                    style={{margin: 0}}
                />
            </View>
            
        </View>}
            
        
        </CountdownCircleTimer>
    )
}

export default Timer