
import axios from 'axios';

const API_URL = 'https://api-upokar.onrender.com';


const getAllImages = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllSliderImages`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


const allUsers = async () => {
    try {
        const response = await axios.get();
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
};

const updateUser = async (userData) => {
    try {
        const response = await axios.put(`${API_URL}/updateUser`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
};


const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        return null;
    }
};

const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        return null;
    }
};

const getAllProducts = async (category = '') => {

    try {
        const response = await axios.get(`${API_URL}/products`, { params: { category } });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
};
const getProduct = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/product/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};
const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/order`, orderData);
        return response.data;
    } catch (error) {
        console.log(error);

        console.error('Error creating order:', error);
        return null;
    }
};

// Create Blood Donor
const createDonor = async (donorData) => {
    try {
        const response = await axios.post(`${API_URL}/createDonor`, donorData);
        return response.data;
    } catch (error) {
        return null;
    }
};
const getAllDonor = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllDonor`);
        return response.data;
    } catch (error) {
        console.error('Error creating donor:', error);
        return null;
    }
};

// Create Travels Order
const createCarOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/createCarOrder`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating car order:', error);
        return null;
    }
};
const createBusOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/createBusOrder`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating bus order:', error);
        return null;
    }
};
const createTruckOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/createTruckOrder`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating truck order:', error);
        return null;
    }
};
const createCngOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/createCngOrder`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating CNGK order:', error);
        return null;
    }
};
const createBikeOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/createBikeOrder`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating bike order:', error);
        return null;
    }
};
const createLegunaOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/createLegunaOrder`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating leguna order:', error);
        return null;
    }
};

// Get Gas Price
const getGasPrice = async () => {
    try {
        const response = await axios.get(`${API_URL}/getGasPrice`);
        return response?.data[0];
    } catch (error) {
        console.error('Error getting gas price:', error);
        return null;
    }
};

// get Job Data
const getAllJobs = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllJobs`);
        return response?.data;
    } catch (error) {
        console.error('Error getting job data:', error);
        return null;
    }
};

// get Tuition Data
const getAllTuitions = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllTuitions`);
        return response?.data;
    } catch (error) {
        console.error('Error getting tuition data:', error);
        return null;
    }
};

// get Lost Person Data
const getAllLostPerson = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllLostPerson`);
        return response?.data;
    } catch (error) {
        console.error('Error getting lost person data:', error);
        return null;
    }
};

// Create Cylinder Order
const createCylinderOrder = async (cylinderData) => {
    try {
        const response = await axios.post(`${API_URL}/createCylinderOrder`, cylinderData);
        return response.data;
    } catch (error) {
        console.error('Error creating cylinder order:', error);
        return null;
    }
};


// Create Labor Order
const createLabor = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/createLabor`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating labor order:', error);
        return null;
    }
};

export {
    // Image-related functions
    getAllImages,
    // User-related functions
    allUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser,

    // Product-related functions
    getAllProducts,
    getProduct,

    // Order-related functions
    createOrder,

    // Gas-related functions
    getGasPrice,

    // Job-related functions
    getAllJobs,
  
    // Tuition-related functions
    getAllTuitions,

    // Lost Person-related functions
    getAllLostPerson,

    // Donor-related functions
    createDonor,
    getAllDonor,

    // Transport-related order functions
    createCarOrder,
    createBusOrder,
    createTruckOrder,
    createCngOrder,
    createBikeOrder,
    createLegunaOrder,
    // Handyman-related order functions
    createLabor,

    // Cylinder-related order functions
    createCylinderOrder
};



