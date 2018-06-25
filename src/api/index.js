import axios from 'axios'

export const submitApi = (store) => {
  return axios.post(`/referralsubmit`, { data: store })
}

export default submitApi
