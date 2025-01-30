import { View } from "react-native"
import { ProgressChart } from "react-native-chart-kit"
import { Text, useTheme } from "react-native-paper"
import getTimeInDate from "../../Engine/getTimeInDate"
import getSummary from "../../Engine/getStreak"
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const DailyGoal = (props) => {

    const timeToday = getTimeInDate(props.statistics, Date.now());
    const goal = props.settings.goal;
    const summary = getSummary(props.statistics);
    console.log(summary)
    const progress = Math.min(timeToday / goal, 1);
    const theme = useTheme();
    const t = props.t;

    const modifyOpacity = (color , opacity) => {
      let temp = color.slice(0, 3) + "a" + color.slice(3);
      temp = temp.slice(0,-1);
      temp += `,${opacity})`
      return temp
    }
    return(
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap',  width: '97%', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.primaryContainer, marginTop: 10, borderRadius: 20}}>
        <View style={{height: 220}}>
            <ProgressChart
            data={{
                data: [progress]
              }}
            width={Math.min(screenWidth - 50, 400)}
            height={220}
            strokeWidth={16}
            radius={70}
            chartConfig={{
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => modifyOpacity(theme.colors.primary, opacity),
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
            hideLegend={true}
            />
            </View>
            <View style={{flexGrow: 10 ,height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Text variant="headlineSmall">{t('timeToday')}: {Math.round(timeToday / 60)} / {Math.round(goal/60)} {t('min', {count: Math.round(goal/60)})}</Text>
                <Text variant="headlineSmall">{t("streak")}: {summary.currentStreak}</Text>
                <Text variant="headlineSmall">{t("bestStreak")}: {summary.longestStreak}</Text>

            </View>
        
            </View>)
}
export default DailyGoal