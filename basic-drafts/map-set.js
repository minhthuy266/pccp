const hasDuplicate = (array) => {
  const newSet = new Set();

  for (const item of array) {
    if (newSet.has(item)) {
      return true;
    }

    newSet.add(item);
  }

  return false;
};

console.log(hasDuplicate([1, 2, 3, 3]));

const countDistinct = (values) => {
  const newSet = new Set(values);
  return newSet.size;
};

console.log(countDistinct([1, 2, 3, 3, 6, 2]));

const countFrequency = (values) => {
  const newMap = new Map();

  for (const item of values) {
    count = (newMap.get(item) ?? 0) + 1;
    newMap.set(item, count);
  }

  for (const [item, count] of newMap) {
    console.log(`${item} : ${count} times`);
  }

  return newMap;
};

console.log(countFrequency([1, 2, 3, 3, 6, 2]));

const firstRepeatedValue = (values) => {
  const newMap = new Map();

  for (let i = 0; i < values.length; i++) {
    const currentValue = values[i];

    if (newMap.has(currentValue)) {
      return currentValue;
    }

    newMap.set(currentValue, i);
  }

  return null;
};

console.log(firstRepeatedValue([1, 2, 3, 5, 6, 22]));


const firstIndexByValue = (values) => {
    const newMap = new Map()

    for (let index = 0; index < values.length; index++) {
        const currentValue = values[index]
        if (!newMap.has(currentValue)) {
            newMap.set(currentValue, index)
        }
    }

    return newMap
}

console.log(firstIndexByValue([1, 2, 3, 5, 6, 2]));
