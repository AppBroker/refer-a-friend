import { qs, $on, $delegate } from './helpers'

const _itemId = element => parseInt(element.parentNode.parentNode.parentNode.dataset.id, 10)
const ENTER_KEY = 13
const ESCAPE_KEY = 27

export default class View {
  /**
   * @param {!Template} template A Template instance
   */
  constructor(template, fonts) {
    this.template = template
    this.referralList = qs('.component__referral')
    this.submission = qs('.component--submit')
    this.maxRowsPermitted = this.referralList.getAttribute('data-max-rows-permitted')
    this.main = qs('.main')
    fonts()
  }

  /**
   * Populate the referral with a list of items.
   *
   * @param {ItemList} items Array of items to display
   */
  showItems(items) {
    this.referralList.innerHTML = this.template.itemList(items)
    if (items.length < this.maxRowsPermitted) {
      this.referralList.innerHTML += this.template.itemGenerator()
    }
  }

  /**
   * Remove an item from the view.
   *
   * @param {number} id Item ID of the item to remove
   */
  removeItem(id) {
    const elem = qs(`[data-id="${id}"]`)

    if (elem) {
      this.referralList.removeChild(elem)
    }
  }

  /**
   * Set the visibility of the main content and footer.
   *
   * @param {boolean|number} visible Desired visibility
   */
  setMainVisibility(visible) {
    this.main.style.display = !visible ? 'block' : 'none'
  }

  /**
   * Change the appearance of the filter buttons based on the route.
   *
   * @param {string} route The current route
   */
  updateFilterButtons(route) {
    qs('.filters>.selected').className = ''
    qs(`.filters>[href="#/${route}"]`).className = 'selected'
  }

  /**
   * Clear the new referral for new additions
   */
  clearNewReferral() {
    this.newReferralName.value = ''
    this.newReferralSurname.value = ''
    this.newReferralEmail.value = ''
  }

  /**
   * Render an item as either validated or not.
   *
   * @param {!number} id Item ID
   * @param {!boolean} completed True if the item is completed
   */
  setItemValidated(id, validated) {
    const listItem = qs(`[data-id="${id}"]`)

    if (!listItem) {
      return
    }

    listItem.className = validated ? 'validated' : ''
  }

  /**
   * Bring an item out of edit mode.
   *
   * @param {!number} id Item ID of the item in edit
   * @param {!string} title New title for the item in edit
   */
  editItemDone(id, title) {
    const listItem = qs(`[data-id="${id}"]`)

    const input = qs('input.edit', listItem)
    listItem.removeChild(input)

    listItem.classList.remove('editing')

    qs('label', listItem).textContent = title
  }

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindAddItem(handler) {
    this.newReferralName = qs('.new-referral-name')
    this.newReferralSurname = qs('.new-referral-surname')
    this.newReferralEmail = qs('.new-referral-email')

    let firstname
    let surname
    let email
    if (this.newReferralName !== null) {
      $on(this.newReferralName, 'change', ({ target }) => {
        firstname = target.value.trim()
        if (firstname && surname && email) {
          handler(firstname, surname, email)
        }
      })

      $on(this.newReferralSurname, 'change', ({ target }) => {
        surname = target.value.trim()
        if (firstname && surname && email) {
          handler(firstname, surname, email)
        }
      })

      $on(this.newReferralEmail, 'change', ({ target }) => {
        email = target.value.trim()
        if (firstname && surname && email) {
          handler(firstname, surname, email)
        }
      })
    }
  }

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindRemoveItem(handler) {
    $delegate(this.referralList, '.destroy', 'click', ({ target }) => {
      handler(_itemId(target))
    })
  }

  bindSubmit(handler) {
    $delegate(this.submission, '.btn-light', 'click', () => {
      handler()
    })
  }

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindToggleItem(handler) {
    $delegate(this.referralList, '.toggle', 'click', ({ target }) => {
      handler(_itemId(target), target.checked)
    })
  }

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindEditItemSave(handler) {
    $delegate(this.referralList, 'li .edit', 'blur', ({ target }) => {
      if (!target.dataset.iscanceled) {
        handler(_itemId(target), target.value.trim())
      }
    }, true)

    // Remove the cursor from the input when you hit enter just like if it were a real form
    $delegate(this.referralList, 'li .edit', 'keypress', ({ target, keyCode }) => {
      if (keyCode === ENTER_KEY) {
        target.blur()
      }
    })
  }

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindEditItemCancel(handler) {
    $delegate(this.referralList, 'li .edit', 'keyup', ({ target, keyCode }) => {
      if (keyCode === ESCAPE_KEY) {
        target.dataset.iscanceled = true
        target.blur()

        handler(_itemId(target))
      }
    })
  }
}
