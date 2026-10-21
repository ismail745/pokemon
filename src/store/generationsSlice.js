import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API = 'https://pokeapi.co/api/v2'

// Liste des générations (endpoint /generation)
export const fetchList = createAsyncThunk('generations/fetchList', async () => {
  const res = await fetch(`${API}/generation`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  return data.results
})

const generationsSlice = createSlice({
  name: 'generations',
  initialState: {
    generations: [],
    selected: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    selectGeneration(state, action) {
      state.selected = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.status = 'idle'
        state.generations = action.payload
        if (!state.selected && action.payload.length > 0) {
          state.selected = action.payload[0].name
        }
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { selectGeneration } = generationsSlice.actions
export default generationsSlice.reducer
