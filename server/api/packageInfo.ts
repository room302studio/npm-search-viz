import axios from 'axios'
const npmApiUrl = 'http://registry.npmjs.org/-/v1/'

// we want to get the query from the event and then search the npm registry
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('body', JSON.stringify(body))
  const query = body.query
  const queryUrl = `${npmApiUrl}${query}`
  console.log(queryUrl)
  const response = await axios.get(queryUrl)
  console.log(response.data)
  return response
})


  