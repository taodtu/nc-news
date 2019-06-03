exports.format = (arr1, arr2, name, id, keyToChange) => {
 const lookUp = arr1.reduce((acc, cur) => {
  acc[cur[name]] = cur[id];
  return acc;
 }, {});
 return arr2.map(e => {
  const { [keyToChange]: keyToChanges, ...rest } = e;
  return { ...rest, [id]: lookUp[e[keyToChange]] };
 });
};