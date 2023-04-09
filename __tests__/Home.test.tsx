import { expect, test } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Home from '@/pages/index';
import { api } from '@/lib/api';

test('home', async () => {

    const props = {
        aircraft: await api.getAircraft(),
        trips: await api.getTrips(),
        maintenanceSchedules: await api.getMaintenanceSchedules(),
        maintenanceTypes: await api.getMaintenanceTypes(),
        maintenanceEvents: await api.getMaintenanceEvents(),
    }

  render(<Home {...props} />)
  const main = within(screen.getByRole('main'))
  expect(
    main.getByRole('heading', { level: 1, name: /WingWork Exercise/i })
  ).toBeDefined()

//   const footer = within(screen.getByRole('contentinfo'))
//   const link = within(footer.getByRole('link'))
//expect(link.getByRole('img', { name: /vercel logo/i })).toBeDefined()

})