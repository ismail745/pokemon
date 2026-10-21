import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API = 'https://pokeapi.co/api/v2'

// Détail de la génération sélectionnée (endpoint /generation/x)
export const fetchGeneration = createAsyncThunk('generationDetail/fetch', async (name) => {
  const res = await fetch(`${API}/generation/${name}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  // Les espèces ne sont pas triées par l'API : on les trie par numéro de Pokédex
  // les espaces sont triées par numéro de Pokédex national, qui est le dernier segment de l'URL de l'espèce
  const id = (url) => Number(url.split('/').filter(Boolean).pop())
  return {
    name: data.name,
    versionGroups: data.version_groups,
    species: [...data.pokemon_species].sort((a, b) => id(a.url) - id(b.url)),
  }
})

const generationDetailSlice = createSlice({
  name: 'generationDetail',
  initialState: {
    name: null,
    versionGroups: [],
    species: [],
    search: '',
    status: 'idle',
    error: null,
    requestId: null,
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeneration.pending, (state, action) => {
        state.requestId = action.meta.requestId
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchGeneration.fulfilled, (state, action) => {
        // Ignore une réponse obsolète si l'utilisateur a changé de génération entre-temps
        if (action.meta.requestId !== state.requestId) return
        state.status = 'idle'
        Object.assign(state, action.payload)
      })
      .addCase(fetchGeneration.rejected, (state, action) => {
        if (action.meta.requestId !== state.requestId) return
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setSearch } = generationDetailSlice.actions
export default generationDetailSlice.reducer
