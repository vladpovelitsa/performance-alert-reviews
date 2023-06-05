module.exports = (collectionName, doc, recordCounters, writeRecord) => {
  for (let i = 0; i < doc.weapons.length; i++) {
    const weapon = {
      uid: doc.uid,
      weapon: doc.weapons[i]
    }
    writeRecord('weapons', weapon, recordCounters)
  }
  delete doc.weapons // moved to separate file
  return doc
}
