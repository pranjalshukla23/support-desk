import axios from 'axios'

const API_URL = '/api/tickets/'

//create new ticket
const createTicket = async(ticketData, token) => {

  const config = {
    headers:{
      Authorization: 'Bearer ' + token
    }
  }

  const response = await axios.post(API_URL, ticketData, config)

  console.log(response)

  return response.data
}

//get user tickets
const getTickets = async(token) => {

  const config = {
    headers:{
      Authorization: 'Bearer ' + token
    }
  }

  const response = await axios.get(API_URL, config)

  console.log(response)

  return response.data
}


//get user ticket
const getTicket = async(ticketId,token) => {

  const config = {
    headers:{
      Authorization: 'Bearer ' + token
    }
  }

  const response = await axios.get(API_URL + ticketId, config)

  console.log(response)

  return response.data
}

//close user ticket
const closeTicket = async(ticketId,token) => {

  const config = {
    headers:{
      Authorization: 'Bearer ' + token
    }
  }

  const response = await axios.put(API_URL + ticketId,{status: 'closed'}, config)

  console.log(response)

  return response.data
}

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket
}

//export services
export default ticketService
