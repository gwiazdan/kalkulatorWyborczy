import axios from 'axios';

export const fetchData = async () =>  {
    try {
        const response = await axios.get('http://localhost:8081/api/municipalities');
        return response.data;
    } catch (error) {
        console.error('Błąd pobierania danych: ', error);
        return null;
    }
}