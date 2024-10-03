// HashMap factory
function HashMap() {
  const buckets = [];
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
  };
}
