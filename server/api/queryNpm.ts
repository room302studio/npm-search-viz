import axios from 'axios'
const npmApiUrl = 'http://registry.npmjs.org/-/v1/search'

// we want to get the query from the event and then search the npm registry
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const query = body.query
  const queryUrl = `${npmApiUrl}?text=${query}`
  const response = await axios.get(queryUrl)
  return response.data.objects
})


  