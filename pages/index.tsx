import Head from 'next/head'
import Layout from '@/components/Layout';
import TripForm from '@/components/TripForm';


export default function Home() {
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
      </Layout>
    </>
  )
}
