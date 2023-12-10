import apiConfig from "./apiConfig"
export const getCSRF = () => {
    // Upon calling this end, the CSRF token will be set in the cookie
    fetch(`${apiConfig.apiURL}csrf`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
}