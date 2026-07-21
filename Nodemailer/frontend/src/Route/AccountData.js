import { useQueries,useQuery } from "@tanstack/react-query";
async function getAccountdata() {
    try {
        let data = await axios.get("http://localhost:5000/data");
        return data.data.data;
    } catch (error) {
        console.log(error);
    }
}

function Account() {
    return useQuery({
        queryKey: ['Account'],
        queryFn: getAccountdata
    })
}

export default Account;