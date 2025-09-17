import React from 'react'

const PaginationControls = ({ page, setPage, totalItems, pageSize }) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  const goPrev = () => setPage(p => Math.max(1, p - 1))
  const goNext = () => setPage(p => Math.min(totalPages, p + 1))

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center space-x-2">
      <button onClick={goPrev} disabled={page <= 1} className={`px-3 py-1 rounded-md ${page<=1? 'bg-gray-100 text-gray-400':'bg-gray-200'}`}>
        Préc
      </button>

      <div className="hidden sm:flex items-center space-x-1">
        {pages.map(p => (
          <button key={p} onClick={() => setPage(p)} className={`px-3 py-1 rounded-md ${p===page? 'bg-indigo-600 text-white':'bg-white border'} text-sm`}>
            {p}
          </button>
        ))}
      </div>

      <span className="px-3 py-1">Page {page} / {totalPages}</span>

      <button onClick={goNext} disabled={page >= totalPages} className={`px-3 py-1 rounded-md ${page>=totalPages? 'bg-gray-100 text-gray-400':'bg-gray-200'}`}>
        Suiv
      </button>
    </div>
  )
}

export default PaginationControls
