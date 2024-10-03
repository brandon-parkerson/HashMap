// HashMap factory
function HashMap() {
  const buckets = [];
  const loadFactor = 0.75;
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
    hash(key) {
      let hashCode = 0;

      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
      }

      return hashCode;
    },
    set(key, value) {
      const index = this.hash(key);
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }

      // Initialize bucket if it does not exist
      if (!this.buckets[index]) {
        this.buckets[index] = [];
      }
      // Check if key already in bucket
      const bucket = buckets[index];
      for (let i = 0; i < buckets.length; i++) {
        const [existingKey] = bucket[i];
        // If the key already exists then update the value
        if (existingKey === key) {
          bucket[i] = [key, value];
          return;
        }
      }
      // If the key value pair does not exist, push to the array
      bucket.push([key, value]);
    },
    get(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }

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
      const index = this.hash(key);
      const bucket = this.buckets[index];
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }

      if (!bucket) {
        return false;
      }

      for (let i = 0; i < bucket.length; i++) {
        const [existingKey, value] = bucket[i];
        if (existingKey === key) {
          return true;
        }
      }
      return false;
    },
    remove(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];

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

      for (let i = 0; i < this.buckets.length; i++) {
        const bucket = this.buckets[i];
        if (bucket) {
          for (let j = 0; j < bucket.length; j++) {
            num++;
          }
        }
      }
      return num;
    },
    clear() {
      for (let i = 0; i < this.buckets.length; i++) {
        this.buckets[i] = [];
      }
    },
    keys() {
      const arr = [];
      for (let i = 0; i < this.buckets.length; i++) {
        const bucket = this.buckets[i];
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
      for (let i = 0; i < this.buckets.length; i++) {
        const bucket = this.buckets[i];
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
      for (let i = 0; i < this.buckets.length; i++) {
        const bucket = this.buckets[i];
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
