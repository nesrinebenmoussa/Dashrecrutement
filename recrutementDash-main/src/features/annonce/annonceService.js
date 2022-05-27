import axios from "axios";

const API_URL = "http://localhost:5000/api/annonces/";

// Create
const create = async(Data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(`${API_URL}`, Data, config);

    return response.data;
};

// Get all
const getAll = async() => {
    const response = await axios.get(API_URL + "all");
    return response.data;
};

// Delete
const deleteById = async(Id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + Id, config);

    return response.data;
};

const getById = async(Id) => {
    const response = await axios.get(`http://localhost:5000/api/annonces/${Id}`);
    return response.data;
};

const updateAnnonce = async(data) => {
    console.log(data._id, "iidddd ", data, "serviiiiiiiiii");
    const respons = await axios.put(
        `http://localhost:5000/api/annonces/${data._id}`,
        data
    );
    return respons.data;
};
const annonceService = {
    create,
    getAll,
    deleteById,
    getById,
    updateAnnonce,
};

export default annonceService;