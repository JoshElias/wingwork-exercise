import Head from 'next/head'
import Layout from '@/components/Layout';
import TripForm from '@/components/TripForm';
import { api } from '@/lib/api';
import { 
  TripOutput,
  MaintenanceScheduleOutput,
  MaintenanceEventOutput,
  AircraftMap,
  MaintenanceTypeMap,
} from '@/lib/types';
import ActivityFeed from '@/components/ActivityFeed';


export async function getServerSideProps() {
  return {
    props: {
      aircraft: await api.getAircraft(),
      trips: await api.getTrips(),
      maintenanceSchedules: await api.getMaintenanceSchedules(),
      maintenanceTypes: await api.getMaintenanceTypes(),
      maintenanceEvents: await api.getMaintenanceEvents(),
    }
  }
}

export interface HomeProps {
  aircraft: AircraftMap,
  trips: TripOutput[],
  maintenanceSchedules: MaintenanceScheduleOutput[],
  maintenanceTypes: MaintenanceTypeMap,
  maintenanceEvents: MaintenanceEventOutput[]
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>WingWork Exercise</title>
        <meta name="description" content="Very impressive take home assignment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="m-8 mb-8 sm:mb-12 font-bold text-5xl text-center">
          WingWork Exercise
        </h1>
        <TripForm />
        <ActivityFeed {...props} />
      </Layout>
    </>
  )
}
