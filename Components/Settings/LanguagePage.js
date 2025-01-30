import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItem from "./ListItem";
import { useState } from "react";
import { Dropdown } from "react-native-paper-dropdown";

const LanguagePage = (props) => {

    const [language, setLanguage] = useState(props.settings.language)
    const t = props.t;

    const handleLanguageSelect = (value) => {
        const copy = {...props.settings}
        copy.language = value
        AsyncStorage.setItem("Settings", JSON.stringify(copy));
        props.setSettings(copy)
        setLanguage(value);
    }

    const OPTIONS = [
        { label: 'English', value: 'en' },
        { label: 'Polski', value: 'pl' },
      ];

      const languageDropdown = (
        <Dropdown
            options={OPTIONS}
            value={language}
            onSelect={handleLanguageSelect}
        />)
    return(
    <ListItem
        title={t("languageItemTitle")}
        icon="earth"
        isRight={true}
        right={languageDropdown}
        onPress={() => {}}
      />)
}
export default LanguagePage