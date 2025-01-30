import { ScrollView } from "react-native";
import ListItem from "./ListItem"
import { useNavigation } from '@react-navigation/native';

const CategoriesView = (props) => {
    const empty = () => <></>
    const t = props.t;
    const navigation = useNavigation()
    
    return(
    <ScrollView style={{flex: 1}}>
        <ListItem
            title={t("apperancePageTitle")}
            disc={t("apperancePageDisc")}
            icon="palette"
            isRight={false}
            right={empty}
            onPress={()=> navigation.navigate("Apperance")}
        />
        <ListItem
            title={t("languagePageTitle")}
            disc={t("languagePageDisc")}
            icon="translate"
            isRight={false}
            right={empty}
            onPress={()=> navigation.navigate("Language")}
        />
        <ListItem
            title={t("timerPageTitle")}
            disc={t("timerPageDisc")}
            icon="timer"
            isRight={false}
            right={empty}
            onPress={()=> navigation.navigate("Timer")}
        />
        <ListItem
            title={t("goalsPageTitle")}
            disc={t("goalsPageDisc")}
            icon="flag"
            isRight={false}
            right={empty}
            onPress={()=> navigation.navigate("Goals")}
        />
        
    </ScrollView>)
}
export default CategoriesView