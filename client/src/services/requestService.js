import { useAuth } from '../contexts/AuthContext'

const fetchWithAuth = async (url, request, idToken) => {
    console.log(JSON.stringify(request))
    if (!request.method) request.method = 'GET'
    request.headers = {
        'Authorization': `Bearer ${idToken}`,
        ...request.header
    }
    console.log(JSON.stringify(request))
    const response = await fetch(url, {
        ...request
    })
    return response
}

export default fetchWithAuth
