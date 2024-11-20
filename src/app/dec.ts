const cacheMap = new Map<string, any>();
export function MemoiseMine(
  this: any,
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log(target, propertyKey, descriptor, this);
  descriptor.value = function (...ape: any[]) {
    const key = ape.toString();
    if (cacheMap.has(key)) {
      console.log('has ooo');
      return cacheMap.get(key);
    }

    console.log('no get ooo');

    // descriptor.value.apply(this, ape);

    const result = 4;
    cacheMap.set(key, result);
  };

  return descriptor.value;
}
