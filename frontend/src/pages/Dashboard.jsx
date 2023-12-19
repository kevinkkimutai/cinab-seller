import React from 'react'
import { DashboardPanels, TableProducts, TableResents } from '../components'

export default function Dashboard() {
  return (
    <div class="dash text-black dark:text-white">
    <DashboardPanels />
       <div class="grid gap-4 mt-8">
      <div class="grid grid-cols-2 gap-4">
    
        <TableProducts />
        <TableResents/>
    
      </div>
        </div>
    </div>
  )
}
