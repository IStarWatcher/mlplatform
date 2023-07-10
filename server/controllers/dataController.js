const axios = require('axios')
const ApiError = require('../error/ApiError')
class DataController {
    async getData(req, res, next) {
        const { idbase, sort, itemType, query, page } = req.body
        console.log(idbase, sort, itemType, query, page);

        const pg = (page - 1) * 10
        const url = 'https://api.zotero.org/groups/' + idbase + '/items/top?v=3&include=bib,data&itemType=' + itemType + '&sort=' + sort + '&q=' + query + '&qmode=titleCreatorYear&start=' + pg + '&limit=10'
        try {
            const dat = await axios.get(url);
            const data = dat.data
            const response = data.map(statya => {
                const author = statya.data.creators
                const creators = author.reduce((total, creator) => total + creator.firstName + ' ' + creator.lastName + ', ', '')

                return {
                    "creators": creators,
                    "title": '«' + statya.data.title + '»',
                    "publicationTitle": statya.data.publicationTitle,
                    "volume": statya.data.volume,
                    "DOI": statya.data.DOI
                }
            })

            return res.json({ response })
            // console.log(idbase_new, sort_new, itemType_new, query_new);
        } catch (error) {
            console.error(error);
            if (error.response) {
                return next(ApiError.internal(`Ошибка: ${error.response.status} ${error.response.statusText}`))
            } else if (error.request) {
                return next(ApiError.badRequest('Ошибка: нет ответа от сервера'))
            } else {
                return next(ApiError.internal('Ошибка:', error.message))
            }
        }
    }

    async getCountData(req, res, next) {
        const { idbase, sort, itemType, query } = req.body

        const url = 'https://api.zotero.org/groups/' + idbase + '/items/top?v=3&include=bib,data&itemType=' + itemType + '&sort=' + sort + '&q=' + query + '&qmode=titleCreatorYear'
        try {
            const dat = await axios.get(url);
            // const dt = dat.data
            const count = dat.data.length
            return res.json({ count })
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new DataController()
