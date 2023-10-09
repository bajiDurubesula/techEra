import {Link} from 'react-router-dom'
import './index.css'

const CoursesList = props => {
  const {details} = props
  const {id, name, logoUrl} = details
  return (
    <li className="listContainer">
      <button className="linkButton" type="button">
        <Link to={`/courses/${id}`}>
          <img src={logoUrl} alt={name} />
        </Link>
        <p>{name}</p>
      </button>
    </li>
  )
}

export default CoursesList
