import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="navContainer">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="techLogo"
      />
    </Link>
  </nav>
)

export default withRouter(Header)
