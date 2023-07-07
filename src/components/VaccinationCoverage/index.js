// Write your code here
import {
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
  XAxis,
  YAxis,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {reqData} = props
  const newData = [...reqData]
  console.log(newData)

  const DataFormatter = number => {
    if (number * 10000 > 1000) {
      return `${((number * 10000) / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="chart-container ">
      <h1 className="failure-head"> Vaccination Coverage </h1>
      <ResponsiveContainer
        width={1000}
        height={300}
        className="chart-container"
      >
        <BarChart data={newData}>
          <XAxis
            dataKey="vaccine_date"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose_1" name="dose_1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="dose_2" name="dose_2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
