import { Helmet } from "react-helmet";

const PageHeader = ({ children }) => {
  return (
    <Helmet>
      {children}
    </Helmet>
  )
}

export default PageHeader