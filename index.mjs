// HashMap factory
function HashMap() {
  let buckets = new Array(16); // Initialize buckets with a fixed size of 16
  const loadFactor = 0.75; // Load factor threshold

  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return Math.abs(hashCode) % buckets.length; // Ensure index is within bounds
  }

  function resize() {
    const oldBuckets = buckets; // Keep a reference to the old buckets
    buckets = new Array(oldBuckets.length * 2); // Double the size of the buckets array

    for (let i = 0; i < oldBuckets.length; i++) {
      const bucket = oldBuckets[i];
      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          const [key, value] = bucket[j];
          const newIndex = hash(key); // Rehash to new index
          if (!buckets[newIndex]) {
            buckets[newIndex] = [];
          }
          buckets[newIndex].push([key, value]); // Insert into new bucket
        }
      }
    }
  }

  return {
    set(key, value) {
      const index = hash(key);

      // Initialize bucket if it does not exist
      if (!buckets[index]) {
        buckets[index] = [];
      }

      // Check if resizing is needed based on the load factor
      if (this.length() / buckets.length > loadFactor) {
        resize();
      }

      // Check if the key already exists in the bucket
      const bucket = buckets[index];
      for (let i = 0; i < bucket.length; i++) {
        const [existingKey] = bucket[i];
        // If the key already exists, update the value
        if (existingKey === key) {
          bucket[i] = [key, value];
          return;
        }
      }
      // If the key-value pair does not exist, push to the array
      bucket.push([key, value]);
    },

    get(key) {
      const index = hash(key);
      const bucket = buckets[index];
      
      // If the bucket does not exist, return null
      if (!bucket) {
        return null;
      }

      for (let i = 0; i < bucket.length; i++) {
        const [existingKey, value] = bucket[i];
        if (existingKey === key) {
          return value;
        }
      }

      return null;
    },

    has(key) {
      const index = hash(key);
      const bucket = buckets[index];

      if (!bucket) {
        return false;
      }

      for (let i = 0; i < bucket.length; i++) {
        const [existingKey] = bucket[i];
        if (existingKey === key) {
          return true;
        }
      }
      return false;
    },

    remove(key) {
      const index = hash(key);
      const bucket = buckets[index];

      if (!bucket) {
        return false;
      }

      for (let i = 0; i < bucket.length; i++) {
        const [existingKey] = bucket[i];
        if (existingKey === key) {
          bucket.splice(i, 1);
          return true;
        }
      }
      return false;
    },

    length() {
      let num = 0;
      for (let i = 0; i < buckets.length; i++) {
        const bucket = buckets[i];
        if (bucket) {
          num += bucket.length;
        }
      }
      return num;
    },

    clear() {
      buckets = new Array(16); // Reset the buckets back to size 16
    },

    keys() {
      const arr = [];
      for (let i = 0; i < buckets.length; i++) {
        const bucket = buckets[i];
        if (bucket) {
          for (let j = 0; j < bucket.length; j++) {
            const key = bucket[j][0];
            arr.push(key);
          }
        }
      }
      return arr;
    },

    values() {
      const arr = [];
      for (let i = 0; i < buckets.length; i++) {
        const bucket = buckets[i];
        if (bucket) {
          for (let j = 0; j < bucket.length; j++) {
            const value = bucket[j][1];
            arr.push(value);
          }
        }
      }
      return arr;
    },

    entries() {
      const arr = [];
      for (let i = 0; i < buckets.length; i++) {
        const bucket = buckets[i];
        if (bucket) {
          for (let j = 0; j < bucket.length; j++) {
            const entry = bucket[j];
            arr.push(entry);
          }
        }
      }
      return arr;
    },
  };
}

export { HashMap };
