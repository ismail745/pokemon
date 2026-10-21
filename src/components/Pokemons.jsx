import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Box, Card, CircularProgress, InputAdornment, TextField, Typography } from '@mui/material'
import { fetchGeneration, setSearch } from '../store/generationDetailSlice'

// Illustration officielle PokéAPI, indexée par le numéro de Pokédex (dernier segment de l'URL de l'espèce)
const ARTWORK = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'
const dexId = (url) => Number(url.split('/').filter(Boolean).pop())

export default function Pokemons() {
  const dispatch = useDispatch()
  const selected = useSelector((state) => state.generations.selected)
  const { species, search, status, error } = useSelector((state) => state.generationDetail)

  // Recharge le détail à chaque changement de génération
  useEffect(() => {
    if (selected) dispatch(fetchGeneration(selected))
  }, [dispatch, selected])

  const filtered = species.filter((s) => s.name.includes(search.trim().toLowerCase()))

  return (
    <>
      <TextField
        placeholder="Rechercher un pokémon"
        fullWidth
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        sx={{ mt: 3, bgcolor: 'background.paper' }}
        slotProps={{
          input: { startAdornment: <InputAdornment position="start">🔍</InputAdornment> },
        }}
      />
      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress size={56} />
        </Box>
      )}
      {status === 'failed' && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {status === 'idle' && (
        <>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            {filtered.length} pokémon
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: 'grid',
              gap: 2,
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            }}
          >
            {filtered.map((s) => {
              const id = dexId(s.url)
              return (
                <Card key={s.name} elevation={1} sx={{ transition: 'transform .15s', '&:hover': { transform: 'translateY(-4px)' } }}>
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Box sx={{ bgcolor: '#f2f4f8', borderRadius: '50%', aspectRatio: '1', display: 'grid', placeItems: 'center' }}>
                      <Box
                        component="img"
                        src={`${ARTWORK}/${id}.png`}
                        alt={s.name}
                        loading="lazy"
                        sx={{ width: '85%', height: '85%', objectFit: 'contain' }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                      #{String(id).padStart(4, '0')}
                    </Typography>
                    <Typography variant="h6" sx={{ textTransform: 'capitalize', fontWeight: 700 }}>
                      {s.name}
                    </Typography>
                  </Box>
                </Card>
              )
            })}
          </Box>
        </>
      )}
    </>
  )
}
