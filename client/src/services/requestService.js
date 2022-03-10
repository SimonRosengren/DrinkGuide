import { getAuth } from 'firebase/auth'

const fetchWithAuth = async (url, request) => {
    const currentUser = getAuth().currentUser
    const idToken = await (currentUser || {}).getIdToken(true)
    if (!request.method) request.method = 'GET'
    request.headers['Authorization'] = `Bearer ${idToken || ''}`
    const response = await fetch(url, {
        ...request
    })
    return response
}

export default fetchWithAuth
