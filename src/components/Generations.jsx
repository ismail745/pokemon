import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { fetchList, selectGeneration } from '../store/generationsSlice'

export default function Generations() {
  const dispatch = useDispatch()
  const { generations, selected, status } = useSelector((state) => state.generations)

  useEffect(() => {
    dispatch(fetchList())
  }, [dispatch])

  return (
    <FormControl sx={{ minWidth: 200 }} disabled={status === 'loading'}>
      <InputLabel id="generation-label">Génération</InputLabel>
      <Select
        labelId="generation-label"
        label="Génération"
        value={generations.length ? selected : ''}
        onChange={(e) => dispatch(selectGeneration(e.target.value))}
      >
        {generations.map((g) => (
          <MenuItem key={g.name} value={g.name}>
            {g.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
