// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#121212',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    navy: '#041E42',
    gold: '#FFC72C',
  }
}

const overlay: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#575A5E',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    navy: '#041E42',
    gold: '#FFC72C',
    blue: '#1873FF',
    orange: '#F48D2E',
  }
}

// Vuetify
import { createVuetify, type ThemeDefinition } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme,
      overlay
    }
  }
})