const http = require('https');

class UrbnDictionary {

  _api;
  _data = '';

  constructor() {
    this._api = 'https://api.urbandictionary.com/v0/';
  }

  /**
   * Get the first result of your lookup.
   * @param term
   * @returns {Promise<Object>}
   */
  getFirst(term) {
    return new Promise((resolve, reject) => {
      http.get(this._api + 'define?term=' + term, (res) => {

        if (typeof term === 'undefined') {
          reject(this.sendError('undefined', res.statusCode))
        }

        if (res.statusCode !== 200) {
          reject(this.sendError('not200', res.statusCode))
        }

        res.on('error', error => {
          reject(this.sendError('generic', null, error))
        })

        res.on('data', chunk => {
          this._data += chunk;
        }).on('end', () => {
          try {
            resolve(JSON.parse(this._data).list[0])
          } catch (error) {
            reject({error: error})
          }
        })
      })
    })
  }

  /**
   * Get all results from page 1.
   * @param term
   * @return {Promise<Object>}
   */
  getAll(term) {
    return new Promise((resolve, reject) => {
      http.get(this._api + 'define?term=' + term, (res) => {

        if (typeof term === undefined) {
          reject(this.sendError('undefined', res.statusCode));
        }

        if (res.statusCode !== 200) {
          reject(this.sendError('not200', res.statusCode));
        }

        res.on('error', error => {
          reject(this.sendError('generic', null, error))
        })

        res.on('data', chunk => {
          this._data += chunk;
        }).on('end', () => {
          try {
            resolve(JSON.parse(this._data).list)
          } catch (error) {
            reject(this.sendError('generic', null, error))
          }
        })
      })
    })
  }

  /**
   * Returns an array of random word definitions.
   * From this array you can get one with its index.
   * TODO: get a random from within the list... chaining method to allow the user to define 1 index
   * @returns {Promise<unknown>}
   */
  getRandom() {
    return new Promise((resolve, reject) => {
      http.get(this._api + 'random', (res) => {
        res.on('data', chunk => {
          this._data += chunk;
        }).on('end', () => {
          try{
            resolve(JSON.parse(this._data).list);
          }catch (error) {
            reject(this.sendError('generic', null, error))
          }
        })
      })
    })
  }

  sendError(type, statusCode, error) {

    if (type === 'undefined') {
      return {error: statusCode, message: 'No term defined.'};
    }

    if (type === 'not200') {
      return {code: statusCode, message: 'Some error occurred, try again.'};
    }

    if (type === 'generic') {
      return {message: error.message}
    }
  }

}

function Urbn() {
  return new UrbnDictionary();
}

module.exports = {
  Urbn
};