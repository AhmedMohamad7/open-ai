import { LineChart, PieChart } from 'react-chartkick'
import 'chartkick/chart.js'

const Charts = ({happiness,sadness,satisfaction}) => {
  return( <div>
      <PieChart data={[["Happiness", happiness], ["Sadness", sadness],["Satisfaction", satisfaction]]} />
  </div>);
};

export default Charts;
