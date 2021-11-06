const http = require('https');

class UrbnDictionary {

  _api;

  constructor() {
    this._api = 'https://api.urbandictionary.com/v0/define?term=';
  }

  /**
   * Get the first result of your lookup.
   * @param term
   * @returns {Promise<Object>}
   */
  getFirst(term) {
    return new Promise((resolve, reject) => {
      http.get(this._api + term, (res) => {
        let data = '';

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
          data += chunk;
        }).on('end', () => {
          try {
            resolve(JSON.parse(data).list[0])
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
      http.get(this._api + term, (res) => {
        let data = '';

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
          data += chunk;
        }).on('end', () => {
          try {
            resolve(JSON.parse(data).list)
          } catch (error) {
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