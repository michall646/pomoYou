import { ContributionGraph } from "react-native-chart-kit"
import { Dimensions, View } from "react-native";
import { useTheme, Text } from "react-native-paper";
const screenWidth = Dimensions.get("window").width;
import moment from "moment";
const Heatmap =(props) => {
    const theme = useTheme();
    const t = props.t;
    const formatDate =(date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    const calculateHeatData = (local) =>{
        let heatdata = [];
        for(let element in local){
            let currentDate = new Date(local[element].date).toISOString().split('T')[0];
            let dates = heatdata.map((x)=> x = x.date);
            let index = dates.indexOf(currentDate);
            if(index === -1 )
                { heatdata.push({"date": currentDate, "count": local[element].length}) }
            else{
                heatdata[index] = {"date": currentDate, "count": heatdata[index].count + local[element].length}
            }
          
        }
        console.log(heatdata)
        return heatdata
    }

    const calculateLastWeek = (data) => {
      const lastWeekTimestamp = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0);
      console.log(lastWeekTimestamp);

      const lastWeek = data.filter(x => x.date > lastWeekTimestamp);
      console.log(lastWeek);
      const time = lastWeek.reduce((acc, cur) => acc + cur.length,0)
      console.log(time);
      
      let sum = [];
      for(let element in lastWeek){
        let currentDate = new Date(lastWeek[element].date).toISOString().split('T')[0];
        let dates = sum.map((x)=> x = x.date);
        let index = dates.indexOf(currentDate);
        if(index === -1 )
            { sum.push({"date": currentDate, "length": lastWeek[element].length}) }
        else{
            sum[index] = {"date": currentDate, "length": sum[index].length + lastWeek[element].length}
        }
        
    }
    const goal = sum.filter(x => x.length > props.settings.goal);
      
    const best = sum.length === 0? 0:  Math.max(...sum.map(x => x.length));
    console.log(best);
    return {time,goal,best}
    }
      const lastWeek = calculateLastWeek(props.statistics);
      const data = calculateHeatData(props.statistics);
      const commitsData = [
        { date: formatDate('1736964910818'), count: 1 },
      ];
      const modifyOpacity = (color , opacity) => {
        if(opacity === 0.15) opacity = 0.1;
        let temp = color.slice(0, 3) + "a" + color.slice(3);
        temp = temp.slice(0,-1);
        
        temp += `,${opacity * 1.5})`
        
        return temp
      }
    
    return(
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '97%', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.primaryContainer, marginTop: 10, borderRadius: 20}}>
        <ContributionGraph
            values={data}
            endDate={new Date()}
            numDays={105}
            width={Math.min(screenWidth - 50, 400)}
            height={220}
            chartConfig={{
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => modifyOpacity(theme.colors.primary, opacity),
                labelColor: (opacity = 1) => theme.colors.onSecondaryContainer,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
            />
            <View style={{width: 300,flexGrow: 10 ,height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Text variant="headlineMedium">{t("thisWeek")}:</Text>
                <Text variant="headlineSmall">{t("totalTime")}: {Math.round(lastWeek.time/ 60)} {t('min', {count: Math.round(lastWeek.time/ 60)})}</Text>
                <Text variant="headlineSmall">{t("goalsHit")}: {lastWeek.goal.length} {t('timeP', {count: lastWeek.goal.length})}</Text>
                <Text variant="headlineSmall">{t("best")}: {Math.round(lastWeek.best/60)} {t('min', {count: Math.round(lastWeek.best/60)})}</Text>
                <Text variant="headlineSmall"></Text>

            </View>
            </View>
    )
}
export default Heatmap