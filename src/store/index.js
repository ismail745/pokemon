import { configureStore } from '@reduxjs/toolkit'
import generationsReducer from './generationsSlice'
import generationDetailReducer from './generationDetailSlice'

// Redux DevTools est activé automatiquement par configureStore
export const store = configureStore({
  reducer: {
    generations: generationsReducer,
    generationDetail: generationDetailReducer,
  },
})
