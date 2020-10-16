import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import { getBudgetData } from '../Axios/Axios';



class PieChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:{
      }

    }
  }
  componentDidMount() {
    this.getChartData();
  }

  getChartData() {
    getBudgetData().then(res => {
      console.log(res.data)
      const budgets = res.data.myBudget;
      let labels = [];
      let data = [];
      budgets.forEach(element => {
        labels.push(element.title);
        data.push(element.budget);
  
      });
  
  
      console.log(budgets)
      this.setState({
        chartData: {
          labels: labels,
          datasets: [
            {
              label: "Expenses",
              data: data,
              backgroundColor: [
                '#36a2eb',
                '#ff6384',
                '#fd6b19',
                '#dd6735',
                '#0b0d08',
                '#ffcd56',
                '#d6e5e8'
              ],
            }
          ]
        }
      });
    });
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
  }

  render(){
    return (
      <div className="chart">

        <Pie
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              // text:'Chart for your Expenses',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}

export default PieChart;