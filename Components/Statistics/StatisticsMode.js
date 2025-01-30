import { ProgressChart } from "react-native-chart-kit"
import DailyGoal from "./DailyGoal"
import { ScrollView } from "react-native"
import Heatmap from "./Heatmap"
import { useTheme } from "react-native-paper"
const StatisticsMode = (props) => {
    const theme = useTheme();
    console.log(theme);
    return(
        <>
            <ScrollView contentContainerStyle={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 10, borderRadius: 15}}>
                <DailyGoal
                    t={props.t}
                    statistics={props.statistics}
                    settings={props.settings}
                />
                <Heatmap t={props.t} statistics={props.statistics} settings={props.settings}/>
            </ScrollView>
        </>
    )
}
export default StatisticsMode