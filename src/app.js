import Controller from './controller'
import { $on } from './helpers'
import Template from './template'
import Store from './store'
import View from './view'
import Fonts from './fonts/fonts'

const store = new Store('foolproof-task')

const template = new Template()
const view = new View(template, Fonts)

/**
 * @type {Controller}
 */
const controller = new Controller(store, view)

const setView = () => controller.setView(document.location.hash)
$on(window, 'load', setView)
$on(window, 'hashchange', setView)

