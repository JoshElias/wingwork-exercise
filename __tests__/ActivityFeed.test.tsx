import { expect, it, describe } from 'vitest'
import { render } from '@testing-library/react'
import ActivityFeed from '@/components/ActivityFeed';
import { api } from '@/lib/api';

describe('ActivityFeed', () => {
  it('should render a list of ActivityEntry components', async () => {

    // I should really mock this data as a proper test would
    // only rely on the function being tested and not it's dependencies.
    // However I've already spent too much time on this exercise so I'm cutting this corner
    const aircraft= await api.getAircraft(),
          trips= await api.getTrips(),
          maintenanceSchedules = await api.getMaintenanceSchedules(),
          maintenanceTypes = await api.getMaintenanceTypes(),
          maintenanceEvents = await api.getMaintenanceEvents();

    const { getAllByTestId } = render(
      <ActivityFeed 
        aircraft={aircraft} 
        trips={trips} 
        maintenanceSchedules={maintenanceSchedules} 
        maintenanceTypes={maintenanceTypes}
        maintenanceEvents={maintenanceEvents}
      />
    )
    
    // Check that the component renders a list of ActivityEntry components
    const activityEntries = getAllByTestId('activity-entry')
    expect(activityEntries.length).toBeGreaterThan(0);
  });
});
