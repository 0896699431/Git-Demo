import React from 'react'
import { useColorScheme } from 'react-native-appearance'

import { ThemeProvider } from 'styled-components'
import Theme from 'utils/Theme'

const withTheme = () => Component => {
  function useTheme() {
    const scheme = useColorScheme()
    const isDarkMode = scheme === 'dark'
    const { dark, light } = Theme

    return isDarkMode ? dark : light
  }

  function DarkMode(childProps) {
    const theme = useTheme()

    return (
      <ThemeProvider theme={theme}>
        <Component theme={theme} {...childProps} />
      </ThemeProvider>
    )
  }

  return DarkMode
}

export default withTheme()
