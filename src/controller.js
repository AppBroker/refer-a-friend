import submitApi from './api/'

export default class Controller {
  /**
   * @param  {!Store} store A Store instance
   * @param  {!View} view A View instance
   */
  constructor(store, view) {
    this.store = store
    this.view = view

    view.bindEditItemSave(this.editItemSave.bind(this))
    view.bindRemoveItem(this.removeItem.bind(this))
    view.bindSubmit(this.submitReferrals.bind(this))

    this._activeRoute = ''
    this._lastActiveRoute = null
  }

  /**
   * Set and render the active route.
   *
   * @param {string} raw '' | '#/' | '#/active' | '#/completed'
   * @returns {nothing} - nothing
   */
  setView(raw) {
    const route = raw.replace(/^#\//, '')

    this._activeRoute = route
    this._filter()
  }

  /**
   * Add an Item to the Store and display it in the list.
   *
   * @param {!string} title Title of the new item
   * @returns {nothing} - nothing
   */
  addItem(name, surname, email) {
    //TODO: Validation to be applied here
  	this.store.insert({
  		id: Date.now(),
  		name,
      surname,
      email,
  		valid: false
  	}, () => {
  		this.view.clearNewReferral()
  		this._filter(true)
  	})
  }

  /**
   * Submit the form data to the submissions api.
   *
   */
  async submitReferrals() {
    //TODO:Example api call added here, hook up to real service
    const submitRes = await submitApi(this.store.getStore())
    const submissionResult = await submitRes.json()
    return submissionResult
  }

  /**
   * Save an Item in edit.
   *
   * @param {number} id ID of the Item in edit
   * @param {!string} title New title for the Item in edit
   * @returns {nothing} - nothing
   */
  editItemSave(name, surname, email) {
    //TODO: store should be updated if any of the values changes
    return email
  }

  /**
   * Remove the data and elements related to an Item.
   *
   * @param {!number} id Item ID of item to remove
   * @returns {nothing} - nothing
   */
  removeItem(id) {
  	this.store.remove({ id }, () => {
  		this._filter(true)
  		this.view.removeItem(id)
  	})
  }

  /**
   * Refresh the list based on the current route.
   *
   * @param {boolean} [force] Force a re-paint of the list
   * @returns {nothing} - nothing
   */
  _filter(force) {
  	const route = this._activeRoute

  	if (force || this._lastActiveRoute !== '' || this._lastActiveRoute !== route) {
  		/* jscs:disable disallowQuotedKeysInObjects */
  		this.store.find({
  			validated: { validated: false }
  		}[route], this.view.showItems.bind(this.view))
  		/* jscs:enable disallowQuotedKeysInObjects */
      this.view.bindAddItem(this.addItem.bind(this))
  	}

  	this._lastActiveRoute = route
  }
}
