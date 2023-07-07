// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationBYGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {
    cowinDetails: {},
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getCowinDetails()
  }

  onSuccess = data => {
    this.setState({
      cowinDetails: data,
      apiStatus: apiConstants.success,
    })
  }

  onFailure = () => {
    this.setState({
      cowinDetails: {},
      apiStatus: apiConstants.failure,
    })
  }

  getCowinDetails = async () => {
    this.setState({
      apiStatus: apiConstants.loading,
    })
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(apiUrl)

    // console.log(data)
    if (response.ok) {
      const data = await response.json()
      const modifiedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }

      // console.log(modifiedData)
      this.onSuccess(modifiedData)
    } else {
      this.onFailure()
    }
  }

  displaySuccessView = () => {
    const {cowinDetails} = this.state
    const {
      last7DaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = cowinDetails
    return (
      <>
        <VaccinationCoverage reqData={last7DaysVaccination} />
        <VaccinationBYGender data={vaccinationByGender} />
        <VaccinationByAge data={vaccinationByAge} />
      </>
    )
  }

  displayLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  displayFailureView = () => (
    <div className="failure-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-img"
      />
      <h1 className="failure-head"> Something went wrong </h1>
    </div>
  )

  displayView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.displaySuccessView()
      case apiConstants.loading:
        return this.displayLoadingView()
      case apiConstants.failure:
        return this.displayFailureView()
      default:
        return null
    }
  }

  render() {
    // console.log(last7DaysVaccination)
    // console.log(vaccinationByGender)
    // console.log(vaccinationByAge)
    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png "
              alt="website logo"
              className="website-logo"
            />
            <h1 className="website-name"> Co-Win </h1>
          </div>
          <h1 className="main-head"> CoWIN Vaccination in India </h1>
          {this.displayView()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
