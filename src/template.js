import { escapeForHTML } from './helpers'

export default class Template {
  /**
   * Format the contents of a referral list.
   *
   * @param {ItemList} items Object containing keys you want to find in the template to replace.
   * @returns {!string} Contents for a referral list
   *
   * @example
   * view.show({
   *  id: 1,
   *  name: "Ben",
   *  surname: "Nevis",
   *  email: "ben@nevis.com",
   *  valid: false,
   * })
   */
  itemList(items) {
    return items.reduce((a, item) => a + `
      <li data-id="${item.id}" class="row component__referral--added">
        <div class="row component__referral--template">
          <div class="col-sm-3">
            <label for="firstname${item.id}">Name</label>
            <input id="firstname${item.id}" class="form-control" value="${escapeForHTML(item.name)}" placeholder="Name" autocomplete='name'>
          </div>
          <div class="col-sm-3">
            <label for="surname${item.id}">Surname</label>
            <input id="surname${item.id}" class="form-control" value="${escapeForHTML(item.surname)}" placeholder="Surname" autocomplete='surname'>
          </div>
          <div class="col-sm-3"> 
            <label for="email${item.id}">Email</label>
            <input id="email${item.id}" class="form-control" value="${escapeForHTML(item.email)}" placeholder="Email address" autocomplete='email'>
          </div>
          <div class="col-sm-3">
            <button type="button" class="btn btn-link destroy">
            <div class="component__referral--remove">
              <svg class="component__referral--delete" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
              width="24" height="24">
              <defs>
                <clipPath id="clip_0">
                  <rect x="-1149" y="-247" width="1440" height="582" clip-rule="evenodd"/>
                </clipPath>
              </defs>
              <g clip-path="url(#clip_0)">
                <path fill="rgb(255,255,255)" stroke="none" transform="translate(5 3)" 
                d="M10.5 1L14 1L14 3L0 3L0 1L3.5 1L4.5 0L9.5 0L10.5 1ZM3 18C1.9 18 1 17.1 1 16L1 4L13 4L13 16C13 17.1 12.1 18 11 18L3 18Z" 
                fill-rule="evenodd"/>
              </g>
              </svg>
                Remove
              </div>
            </button>
          </div>
        </div>
      </li>`, '')
  }

  itemGenerator() {
    return `<li class="row component__referral--added">
              <div class="row component__referral--template">
                <div class="col-sm-3">
                  <label for="firstname_add">Name</label>
                  <input id="firstname_add" class="form-control new-referral-name" placeholder="Name" autocomplete='name'>
                </div>
                <div class="col-sm-3">
                  <label for="surname_add">Surname</label>
                  <input id="surname_add" class="form-control new-referral-surname" placeholder="Surname" autocomplete='surname'>
                </div>
                <div class="col-sm-3"> 
                  <label for="email_add">Email</label>
                  <input id="email_add" class="form-control new-referral-email" placeholder="Email address" autocomplete='email'>
                </div>
                <div class="col-sm-3">
                  <button type="button" class="btn btn-link generate">
                  <div class="component__referral--add">
                      Add Friend
                    </div>
                  </button>
                </div>
              </div>
            </li>`
  }
}
