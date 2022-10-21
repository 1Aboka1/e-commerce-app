import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import store from '../store'
import authSlice from '../store/slices/auth'

const axiosService = axios.create({
    baseURL: '/api',
    headers: {
	'Content-Type': 'application/json',
    }
})

axiosService.interceptors.request.use(async (config) => {
    const { token } = store.getState().auth

    if(token !== null) {
	// @ts-ignore
	config.headers.Authorization = 'Bearer ' + token
	// @ts-ignore
	console.debug('[Request]', config.baseURL + config.url, JSON.stringify(token))
    }
    return config
})

axiosService.interceptors.response.use(
    (response) => {
	// @ts-ignore
	console.debug('[Response]', response.config.baseURL + response.config.url, response.status, response.data)
	return Promise.resolve(response)
    },
    (error) => {
	console.debug(
	    '[Response]',
	    error.config.baseURL + error.config.url,
	    error.response.status,
	    error.response.data,
	)
	return Promise.reject(error)
    }
)

// @ts-ignore
const refreshAuthLogic = async (failedRequest) => {
    const { refreshToken } = store.getState().auth
    if(refreshToken !== null) {
	return axios
	    .post(
		'/api/auth/refresh/',
		{
		    refresh: refreshToken,
		},
		{
		    headers: { 'Content-Type': 'application/json' }
		}
	    )
	    .then((response) => {
		const { access, refresh } = response.data
		failedRequest.response.config.headers.Authorization = 'Bearer ' + access
		store.dispatch(
		    authSlice.actions.setAuthTokens({ token: access, refreshToken: refresh })
		)
	    })
	    .catch((error) => {
		if(error.response && error.response.status === 401) {
		    store.dispatch(authSlice.actions.setLogout())
		}
	    })
    }
} 

createAuthRefreshInterceptor(axiosService, refreshAuthLogic)

export function fetcher<T = any>(url: string) {
    return axiosService.get<T>(url).then((response) => response.data)
}

export function sender(url: string, args: object) {
    return axiosService.post(url, args).then((response) => response.data)
}

export default axiosService
