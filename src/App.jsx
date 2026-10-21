import { Container, CssBaseline, Stack } from '@mui/material'
import Generations from './components/Generations'
import Games from './components/Games'
import Pokemons from './components/Pokemons'

export default function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Generations />
          <Games />
        </Stack>
        <Pokemons />
      </Container>
    </>
  )
}
