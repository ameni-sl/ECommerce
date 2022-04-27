import globalVariables from "./store/state";

export const fetchData =  async (token, path, method) => {
    const response = await fetch(
        globalVariables.baseUrl + path, {
            method: method,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Mode": 'no-cors'
            }
        });
    return response;
}




