const npmApiUrl = 'https://registry.npmjs.org/'

// we want to get the query from the event and then search the npm registry
export default defineEventHandler(async (event) => {
  // const body = await readBody(event)
  // console.log('body', JSON.stringify(body))
  const name = getQuery(event).name
  const queryUrl = `${npmApiUrl}${name}`
  
  const response = await fetch(queryUrl)
  const data = await response.json()
  return data
})
