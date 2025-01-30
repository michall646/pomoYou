import { Pressable, View } from "react-native"
import { SegmentedButtons, Text } from "react-native-paper"

const ModeSelect = (props) => {
  const t = props.t;
    const MODETEXTSARRAY = [t("pomodori"),t("shortBreak"),t("longBreak"),];
    
 return (
    <>
    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', width: '100%'}}>
    <SegmentedButtons
        style={{width: '80%', marginBottom: 10}}
        value={props.selectedMode}
        onValueChange={props.setSelectedMode}
        density="low"
        buttons={[
            {
              value: 0,
              //label: 'Pomodoro',
              icon: 'cogs'
            },
            {
              value: 1,
              //label: 'Short Break',
              icon: 'coffee'
            },
            { value: 2, 
              //label: 'Long Break',
              icon: 'umbrella-beach-outline'
                 },
          ]}/>
          <Text>{MODETEXTSARRAY[props.selectedMode]}</Text>
          </View>
    </>
 )
}
export default ModeSelect