import { AxiosRequestConfig, AxiosResponse } from "axios";

// Segregate interfaces (minimum required)
export interface AuthSource {
    token: string | null
}

// ====================================== Substitution v 
export const makeAuthTokenInterceptor = (auth: AuthSource) => {

    // Single responsibility - add token
    return (config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
        if (auth.token) {
            config.headers['Authorization'] = 'Bearer ' + auth.token;
            // config.headers['X-Placki'] = 'Bearer ' + auth.token;
        }
        return config;
    };
}
