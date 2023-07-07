// Write your code here
import {PieChart, Pie, Cell, ResponsiveContainer, Legend} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {data} = props
  console.log(data)

  return (
    <div className="chart-container">
      <h1 className="failure-head">Vaccination By Age</h1>
      <ResponsiveContainer width={1000} height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            startAngle={0}
            endAngle={360}
            outerRadius="80%"
            innerRadius="0%"
            data={data}
            dataKey="count"
          >
            <Cell name="18-14" fill=" #5a8dee" />
            <Cell name="45-60" fill=" #2cc6c6" />
            <Cell name="Above 60" fill=" #a3df9f" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            horizontalAlign="middle"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByAge
