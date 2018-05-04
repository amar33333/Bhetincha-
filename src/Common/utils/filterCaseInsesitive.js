export default (filter, row) => {
  const id = filter.pivotId || filter.id;
  if (row[id] !== null) {
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).indexOf(filter.value.toLowerCase()) !== -1
      : true;
  }
};
