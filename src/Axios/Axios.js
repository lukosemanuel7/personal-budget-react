import axios from 'axios'


export const getBudgetData = () => {

    return axios.get('http://localhost:3030/budget');

  };