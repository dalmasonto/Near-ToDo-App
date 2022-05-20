import Page from '../components/layout/Page'
import PageBody from '../components/layout/PageBody'
import PageHeader from '../components/layout/PageHeader'
import { APP_SEP } from '../app/appConfig'

export default function Home() {
  return (
    <Page>
      <PageHeader>
        <title>{APP_SEP} ToDo dApp</title>
        <meta name="description" content="This is todo dapp running on the blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </PageHeader>
      <PageBody>
        <div className="container py-3 py-md-5 home">
          <h1 className="text-center title">ToDo dApp</h1>
          <div className="description">
            <p className='text-center'>
              This is a simple Todo dApp running on the blockchain.
            </p>
          </div>
        </div>
      </PageBody>
    </Page>
  )
}
