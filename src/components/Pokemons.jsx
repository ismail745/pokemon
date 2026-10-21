import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Avatar, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material'
import { fetchGeneration, setSearch } from '../store/generationDetailSlice'

// Sprite officiel PokéAPI, indexé par le numéro de Pokédex (dernier segment de l'URL de l'espèce)
const SPRITES = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'
const spriteUrl = (url) => `${SPRITES}/${url.split('/').filter(Boolean).pop()}.png`

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
        label="Rechercher un pokémon"
        size="small"
        fullWidth
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        sx={{ mt: 3 }}
      />
      {status === 'loading' && <CircularProgress sx={{ mt: 2 }} />}
      {status === 'failed' && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {status === 'idle' && (
        <List dense>
          {filtered.map((s) => (
            <ListItem key={s.name}>
              <ListItemAvatar>
                <Avatar src={spriteUrl(s.url)} alt={s.name} variant="square" slotProps={{ img: { loading: 'lazy' } }} />
              </ListItemAvatar>
              <ListItemText primary={s.name} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  )
}
