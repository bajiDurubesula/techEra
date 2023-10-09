import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiCourseConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CourseItemDetails extends Component {
  state = {courseDetail: {}, courseStatus: apiCourseConstants.initial}

  componentDidMount() {
    this.courseDetailsApiUrl()
  }

  courseDetailsApiUrl = async () => {
    this.setState({courseStatus: apiCourseConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`

    const response = await fetch(url)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const courseData = {
        id: fetchedData.course_details.id,
        name: fetchedData.course_details.name,
        imageUrl: fetchedData.course_details.image_url,
        description: fetchedData.course_details.description,
      }
      this.setState({
        courseDetail: courseData,
        courseStatus: apiCourseConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({courseStatus: apiCourseConstants.failure})
    }
  }

  success = () => {
    const {courseDetail} = this.state
    const {id, name, imageUrl, description} = courseDetail

    return (
      <div className="bgCourseContainer">
        <img src={imageUrl} alt={name} className="website logo" />
        <div className="textContainer">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  isLoading = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  failure = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.courseDetailsApiUrl}>
        Retry
      </button>
    </div>
  )

  render() {
    const {courseStatus} = this.state

    switch (courseStatus) {
      case apiCourseConstants.success:
        return this.success()
      case apiCourseConstants.failure:
        return this.failure()
      case apiCourseConstants.inProgress:
        return this.isLoading()
      default:
        return null
    }
  }
}

export default CourseItemDetails
