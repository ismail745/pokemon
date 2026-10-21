import { AppBar, Container, CssBaseline, Paper, Stack, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'
import Generations from './components/Generations'
import Games from './components/Games'
import Pokemons from './components/Pokemons'

const theme = createTheme({
  palette: {
    primary: { main: '#e3350d' },
    secondary: { main: '#30a7d7' },
    background: { default: '#f2f4f8' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontSize: 15,
    h5: { fontWeight: 800 },
  },
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          <Typography variant="h5" component="h1">Pokédex</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ sm: 'center' }}>
            <Generations />
            <Games />
          </Stack>
        </Paper>
        <Pokemons />
      </Container>
    </ThemeProvider>
  )
}
