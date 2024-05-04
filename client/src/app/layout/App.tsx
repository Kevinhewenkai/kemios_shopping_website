import { useState } from 'react';
import Catalog from '../../feature/Catalog/Catalog';
import Header from './Header';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={() => {setDarkMode(!darkMode)}} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  )
}

export default App
