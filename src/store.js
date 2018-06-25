import { emptyItemQuery } from './item'

export default class Store {
  /**
   * @param {!string} name Database name
   * @param {function()} [callback] Called when the Store is ready
   */
  constructor(name, callback) {
    /**
     * @type {Storage}
     */
    const localStorage = window.localStorage

    /**
     * @type {ItemList}
     */
    let liveReferrals

    /**
     * Read the local ItemList from localStorage.
     *
     * @returns {ItemList} Current array of referrals
     */
    this.getLocalStorage = () => {
      return liveReferrals || JSON.parse(localStorage.getItem(name) || '[]')
    }

    /**
     * Write the local ItemList to localStorage.
     *
     * @param {ItemList} referrals Array of referrals to write
     */
    this.setLocalStorage = (referrals) => {
      localStorage.setItem(name, JSON.stringify(liveReferrals = referrals))
    }

    if (callback) {
      callback()
    }
  }

  /**
   * Find items with properties matching those on query.
   *
   * @param {ItemQuery} query Query to match
   * @param {function(ItemList)} callback Called when the query is done
   *
   * @example
   * db.find({completed: true}, data => {
   *   // data shall contain items whose completed properties are true
   * })
   */
  find(query, callback) {
    const referrals = this.getLocalStorage()
    let k

    callback(referrals.filter(refer => {
      for (k in query) {
        if (query[k] !== refer[k]) {
          return false
        }
      }
      return true
    }))
  }

  getStore() {
    return this.getLocalStorage()
  }

  /**
   * Update an item in the Store.
   *
   * @param {ItemUpdate} update Record with an id and a property to update
   * @param {function()} [callback] Called when partialRecord is applied
   */
  update(update, callback) {
    const id = update.id
    const referrals = this.getLocalStorage()
    let i = referrals.length
    let k

    while (i--) {
      if (referrals[i].id === id) {
        for (k in update) {
          if (update[k]) {
            referrals[i][k] = update[k]
          }
        }
        break
      }
    }

    this.setLocalStorage(referrals)

    if (callback) {
      callback()
    }
  }

  /**
   * Insert an item into the Store.
   *
   * @param {Item} item Item to insert
   * @param {function()} [callback] Called when item is inserted
   */
  insert(item, callback) {
    const referrals = this.getLocalStorage()
    referrals.push(item)
    this.setLocalStorage(referrals)

    if (callback) {
      callback()
    }
  }

  /**
   * Remove items from the Store based on a query.
   *
   * @param {ItemQuery} query Query matching the items to remove
   * @param {function(ItemList)|function()} [callback] Called when records matching query are removed
   */
  remove(query, callback) {
    let k

    const referrals = this.getLocalStorage().filter(refer => {
      for (k in query) {
        if (query[k] !== refer[k]) {
          return true
        }
      }
      return false
    })

    this.setLocalStorage(referrals)

    if (callback) {
      callback(referrals)
    }
  }

  /**
   * Count total, active, and completed referrals.
   *
   * @param {function(number, number, number)} callback Called when the count is completed
   */
  count(callback) {
    this.find(emptyItemQuery, data => {
      const total = data.length

      let i = total
      let completed = 0

      while (i--) {
        completed += data[i].completed
      }
      callback(total, total - completed, completed)
    })
  }
}
