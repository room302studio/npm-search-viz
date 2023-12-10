<template>
  <section class="w-96 mx-auto my-8">
    <h1>Hello world!</h1>

    <UInput v-model="query" placeholder="NPM Search" />

    <UButton @click="search">Search</UButton>

    <UProgress animation="carousel" v-if="searching" />

    <div v-if="npmResults.length > 0">
      <!-- <pre>{{ npmResults }}</pre> -->

      <div v-for="result in npmResults">
        {{ result }}
      </div>
    </div>
  </section>
</template>

<script setup>
const searching = ref(false)
const query = ref('')
const npmResults = ref([])

const search = async () => {
  searching.value = true
  console.log('searching for', query.value)
  const { data } = await useFetch('/api/queryNpm', {
    method: 'POST',
    body: JSON.stringify({ query: query.value })
  })

  // data is an array of objects that look like
  // {"name":"exif","scope":"unscoped","version":"0.6.0","description":"A node.js library to extract Exif metadata from images.","keywords":["exif","image","jpeg","jpg","makernotes","gps"],"date":"2016-02-02T14:31:59.223Z","links":{"npm":"https://www.npmjs.com/package/exif","homepage":"https://github.com/gomfunkel/node-exif#readme","repository":"https://github.com/gomfunkel/node-exif","bugs":"https://github.com/gomfunkel/node-exif/issues"},"publisher":{"username":"oeuillot","email":"olivier.oeuillot@gmail.com"},"maintainers":[{"username":"gomfunkel","email":"leinich@gmx.net"},{"username":"oeuillot","email":"olivier.oeuillot@gmail.com"}]}

  const results = []

  // now lets loop and get the name and description
  data.value.forEach(async (item) => {

    // const { data } = await $fetch(`/api/packageInfo/${item.package.name}`, {
    //   method: 'GET',
    // })

    // console.log(data)

    results.push({
      name: item.package.name,
      description: item.package.description,
      // metadata: data.value
      // item
    })
  })
  npmResults.value = results
  searching.value = false
}


/*
// Use the global state in this component
const store = useAppStore()
// Access the state variables and functions
const { activeItem, itemList, setActiveItem, addItem, removeItem } = store
*/
</script>

<style></style>
