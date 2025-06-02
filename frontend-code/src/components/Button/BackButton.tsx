import { ChevronLeft } from 'lucide-react'

function BackButton({
  onClick,
  sx,
}: {
  onClick: () => void
  sx?: React.CSSProperties
}) {
  return <ChevronLeft onClick={onClick} style={sx} />
}

export default BackButton
