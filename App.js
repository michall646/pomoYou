
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState, useMemo } from 'react';
import firstTimeLaunch from './Engine/firstTimeLaunch';
import { useTranslation} from "react-i18next";
import './Translation/i18n'
import { PaperProvider, MD3LightTheme, MD3DarkTheme,adaptNavigationTheme} from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { generatedTheme } from './Engine/GeneratedThemes';
import storageToParsedState from './Engine/storageToParsedState';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import Tabs from './Components/Tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({ darkMode: "light", themeIndex: 1, isAutoTheme: false, pomodoriLength: 1000, shortBreakLength:  300, longBreakLength:  1000, goal: 1800});
  const [statistics, setStatistics] = useState([])
  const [materialTheme, setMaterialTheme] = useState(
    useMaterial3Theme({ fallbackSourceColor: "#3400e0" }).theme
  );
  const [autoColorScheme, setColorScheme] = useState(useColorScheme());

  console.log(settings)
  const colorScheme =
    settings.darkMode === "auto"
      ? autoColorScheme
      : settings.darkMode;

  function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string.slice(1);
  }

  const paperTheme = useMemo(() => {
    if (colorScheme === "dark") {
      if (settings.autoColor) {
        return { ...MD3DarkTheme, colors: materialTheme.dark };
      } else {
        return {
          ...MD3DarkTheme,
          colors:
            generatedTheme[settings.themeIndex][
              capitalizeFirstLetter(colorScheme)
            ].colors,
        };
      }
    } else {
      if (settings.autoColor) {
        return { ...MD3DarkTheme, colors: materialTheme.light };
      } else {
        return {
          ...MD3DarkTheme,
          colors:
            generatedTheme[settings.themeIndex][
              capitalizeFirstLetter(colorScheme)
            ].colors,
        };
      }
    }
  }, [
    colorScheme,
    materialTheme,
    settings.themeIndex,
    settings.autoColor,
  ]);
  const navigationTheme = useMemo(() =>
    colorScheme === "dark"
      ? adaptNavigationTheme({
          reactNavigationDark: MD3DarkTheme,
          materialDark: paperTheme,
        }).DarkTheme
      : adaptNavigationTheme({
          reactNavigationLight: MD3LightTheme,
          materialLight: MD3LightTheme,
        }).LightTheme[paperTheme]
  );

  useEffect(() => {
    i18n.changeLanguage(settings.language)
  },[settings])

  useEffect(()=> {
    firstTimeLaunch("Settings", { darkMode: "light", themeIndex: 1, isAutoTheme: false, language: 'en', pomodoriLength: 1200, shortBreakLength:  300, longBreakLength:  1200, goal: 3600, longBreak: true, longBreakFreq: 4}).then(x => setSettings(x));
    firstTimeLaunch("Statistics", ([])).then(x => setStatistics(x));
  },[])

  return (
    <ThemeProvider theme={navigationTheme}>
      <PaperProvider theme={paperTheme}>
          <NavigationContainer theme={navigationTheme}>
          <Tabs t={t} settings={settings} setSettings={setSettings} statistics={statistics} setStatistics={setStatistics}/>
          </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
}

