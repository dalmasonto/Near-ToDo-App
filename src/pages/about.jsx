import Page from '../components/layout/Page'
import PageBody from '../components/layout/PageBody'
import PageHeader from '../components/layout/PageHeader'
import { APP_SEP } from '../app/appConfig'

export default function About() {
  return (
    <Page>
      <PageHeader>
        <title>{APP_SEP} About The dApp</title>
        <meta name="description" content="More info about the app" />
        <link rel="icon" href="/favicon.ico" />
      </PageHeader>
      <PageBody>
        <div className="container py-3 py-md-5 home">
          <h1 className="text-center title">About the ToDo dApp</h1>
          <div className="description">
            <p className='text-center'>
              This is a simple Todo dApp running on the blockchain.
            </p>
            <p>
              It is developed by <a href="https://github.com/dalmasonto/Near-ToDo-App" target="_blank" rel="noreferrer">@dalmasonto</a> and is open source.
            </p>
          </div>
        </div>
      </PageBody>
    </Page>
  )
}
