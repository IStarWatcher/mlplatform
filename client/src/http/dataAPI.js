import {$host} from "./index";

export const getData = async (idbase, sort, itemType, query, page) => {
    console.log("getData: " + idbase + " " + sort + " " + itemType + " " + query + " " + page);
    const data = await $host.post('api/data/get', {idbase, sort, itemType, query, page})
    return data
}

export const getCountData = async (idbase, sort, itemType, query) => {
    console.log("getData: " + idbase + " " + sort + " " + itemType + " " + query);
    const count = await $host.post('api/data/count', {idbase, sort, itemType, query})
    return count
}