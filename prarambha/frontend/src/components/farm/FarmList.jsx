/**
 * FarmList.jsx — renders the grid of FarmCards + empty/loading states.
 */
import FarmCard from "./FarmCard.jsx"
import EmptyState from "../common/EmptyState.jsx"
import LoadingState from "../common/LoadingState.jsx"
import en from "../../i18n/en.json"

export default function FarmList({ farms, activeFarmId, loading, onSelect, onEdit, onDelete, onAdd }) {
  if (loading) return <LoadingState message={en.common.loading} />
  if (!farms.length) {
    return (
      <EmptyState
        message={en.farms.empty}
        action={onAdd}
        actionLabel={en.farms.addFarm}
      />
    )
  }
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-label={en.farms.title}>
      {farms.map((farm) => (
        <li key={farm.id}>
          <FarmCard
            farm={farm}
            isActive={farm.id === activeFarmId}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  )
}
