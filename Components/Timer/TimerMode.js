import { View } from "react-native";
import ModeSelect from "./ModeSelect";
import { useEffect, useState } from "react";
import Timer from "./Timer";
const TimerMode = (props)=> {
    const [selectedMode, setSelectedMode] = useState(0);
    const [marks, setMarks] = useState(0);

    useEffect(() => {
        console.log(marks)
    },[marks])
    return (
        <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '100%', }}>
            <ModeSelect t={props.t} selectedMode={selectedMode} setSelectedMode={setSelectedMode}/>
            <Timer t={props.t} selectedMode={selectedMode} setSelectedMode={setSelectedMode} marks={marks} setMarks={setMarks} settings={props.settings} statistics={props.statistics} setStatistics={props.setStatistics}/>

        </View>
    )
}
export default TimerMode;