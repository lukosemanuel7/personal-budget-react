import React from 'react';
import PieChart from '../PieChart/PieChart';
import D3Chart from '../D3Chart/D3Chart';

function HomePage() {
  return (
    <div className="container center">

        <div className="page-area">

            <div className="text-box">
                <h2>Stay on track</h2>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </div>
    
            <div className="text-box">
                <h2>Alerts</h2>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </div>
    
            <div className="text-box">
                <h2>Results</h2>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </div>
  
            <div className="text-box">
                <h2>Free</h2>
                <p>
                      This app is free!!! And you are the only one holding your data!
                </p>
            </div>


              <div className="pieChart">
                  <h2>Chart</h2>
                  <PieChart/>
              </div>
            <div className="D3Chart" id="d3Chart">
                <h2>D3 Pie Chart</h2>
                <D3Chart/>
            </div>
            
        </div>

    </div>
  );
}

export default HomePage;