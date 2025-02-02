export default function getUrl(idInstance, apiTokenInstance, path, pref = ``) {
    const url = `https://api.green-api.com/waInstance${idInstance}/${path}/${apiTokenInstance}${pref}`
    return url
}