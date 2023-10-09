import {Component} from 'react'

import Loader from 'react-loader-spinner'
import CoursesList from '../CoursesList'
import './index.css'

const apiCourseConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {coursesList: [], apiStatus: apiCourseConstants.initial}

  componentDidMount() {
    this.coursesApiUrl()
  }

  coursesApiUrl = async () => {
    this.setState({apiStatus: apiCourseConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const courses = fetchedData.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        coursesList: courses,
        apiStatus: apiCourseConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiCourseConstants.failure})
    }
  }

  successView = () => {
    const {coursesList} = this.state

    console.log(coursesList)
    return (
      <div className="bg-container">
        <h1>Courses</h1>
        <ul className="coursesUlContainer">
          {coursesList.map(each => (
            <CoursesList details={each} key={each.name} />
          ))}
        </ul>
      </div>
    )
  }

  isLoading = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.coursesApiUrl}>
        Retry
      </button>
    </div>
  )

  apiCourse = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiCourseConstants.success:
        return this.successView()
      case apiCourseConstants.failure:
        return this.failureView()
      case apiCourseConstants.inProgress:
        return this.isLoading()
      default:
        return null
    }
  }

  render() {
    return this.apiCourse()
  }
}

export default Home
