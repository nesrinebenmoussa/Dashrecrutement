import axios from "axios";

const API_URL = "http://localhost:5000/api/condidats/";

// Create
const createCondidat = async(Data, token) => {
    console.log(Data, "hedha fesh nabaath lel api");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, Data, config);

    return response.data;
};

// Get condidats
const getCondidats = async() => {
    const response = await axios.get(API_URL);
    return response.data;
};

// enable disable
const changeStatus = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + id, config);
    return response.data;
};

// Delete
const deleteCondidat = async(Id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(
        `http://localhost:5000/api/condidats/${Id}`,
        config
    );
    return response.data;
};

const getById = async(Id) => {
    const response = await axios.get(`http://localhost:5000/api/condidats/${Id}`);
    return response.data;
};

const update = async(id, updated) => {
    console.log(updated, "from the service ");
    const response = await axios.patch(
        `http://localhost:5000/api/condidats/${id}`,
        updated
    );
    return response.data;
};
const condidatService = {
    createCondidat,
    deleteCondidat,
    getCondidats,
    changeStatus,
    getById,
    update,
};

export default condidatService;