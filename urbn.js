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
      http.get(`${this._api}${term}`, (res) => {
        let data = '';

        if (typeof term === 'undefined') {
          reject({error: res.statusCode, message: 'No term defined.'})
        }

        if (res.statusCode !== 200) {
          reject({code: res.statusCode, message: 'Some error occurred, try again.'});
        }

        res.on('error', (error) => {
          reject({error: error.message})
        })

        res.on('data', (chunk => {
          data += chunk;
        }))
        res.on('end', () => {
          try {
            resolve(JSON.parse(data).list[0])
          } catch (error) {
            reject({error: error})
          }
        })
      }).on('error', (error) => {
        reject({error: error.message})
      })
    })
  }
}

function Urbn() {
  return new UrbnDictionary();
}

module.exports = {
  Urbn
};