import { useSelector } from 'react-redux'
import { Chip, Stack } from '@mui/material'

export default function Games() {
  const versionGroups = useSelector((state) => state.generationDetail.versionGroups)

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {versionGroups.map((vg) => (
        <Chip key={vg.name} label={vg.name} color="secondary" variant="outlined" />
      ))}
    </Stack>
  )
}
