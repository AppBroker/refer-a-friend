/**
 * @typedef {!{id: number, validated: boolean, name: string, surname: string, email: string}}
 */
export let Item

/**
 * @typedef {!Array<Item>}
 */
export let ItemList

/**
 * Enum containing a known-empty record type, matching only empty records unlike Object.
 *
 * @enum {Object}
 */
const Empty = {
  Record: {}
}

/**
 * Empty ItemQuery type, based on the Empty @enum.
 *
 * @typedef {Empty}
 */
export let EmptyItemQuery

/**
 * Reference to the only EmptyItemQuery instance.
 *
 * @type {EmptyItemQuery}
 */
export const emptyItemQuery = Empty.Record

/**
 * @typedef {!({id: number}|{validated: boolean}|EmptyItemQuery)}
 */
export let ItemQuery

/**
 * @typedef {!({id: number, name: string, surname: string, email: string}|{id: number, validated: boolean})}
 */
export let ItemUpdate
