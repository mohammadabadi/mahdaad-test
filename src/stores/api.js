import axios from 'axios'

let failureCount = 0
let isCircuitOpen = false
let circuitTimer = 0

const api = axios.create({
    baseURL: "https://example.com/api"
});
api.interceptors.request.use((config) => {
    if(isCircuitOpen){
        return Promise.reject(new Error("Circuit is open, Try again Later."));
    }
    return config
})
api.interceptors.response.use((response) => {
    failureCount = 0 
    return response
},
(error) => {
    failureCount++
    console.warn("Api Failed. Count:",failureCount);
    if(failureCount >= 3 && !isCircuitOpen){
        isCircuitOpen = true
        console.error("Circuit opened for 1 minute")
        circuitTimer = setTimeout(()=>{
            isCircuitOpen = false
            failureCount = 0
            console.log("Cicuit Closed. Requests can Resume")
        },60*1000)
    }
    return Promise.reject(error)
}
)
export default api