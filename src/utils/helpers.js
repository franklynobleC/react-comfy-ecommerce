export const formatPrice = number => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(number / 100)
}

export const getUniqueValues = (data, type) => {
  //loop through  the Array of data Passed
  let unique = data.map(item => item[type])
  //instead of geting Arrays of Array, use  the method  flat,  to get  the Unique  value
  if (type === 'colors') {
    unique = unique.flat()
  }
  //get only  the unique Values  using  Set inJavascript Data structures, add 'all' to  the Array
  // console.log(unique)
  return ['all', ...new Set(unique)]
}
