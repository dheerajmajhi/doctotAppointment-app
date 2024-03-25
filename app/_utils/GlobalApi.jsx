
const { default: axios } = require("axios");


const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
    baseURL: 'https://doctorappointment-admin.onrender.com/api',
    headers: {
        'Authorization': `Bearers ${API_KEY}`
    }
});

const getCategory = ()=>axiosClient.get('/categories?populate=*');

const getDoctorList = ()=>axiosClient.get('/doctors?populate=*')

const getDoctorByCategory = (Dcategory)=>axiosClient.get('/doctors?filters[category][Name][$in]='+Dcategory+'&populate=*')

const getDoctorById = (id)=>axiosClient.get('/doctors/'+id+'?populate=*')

const bookAppointment = (data)=>axiosClient.post('/appointments',data);

const getAppointment = ()=>axiosClient.get('/appointments?populate=*')

const sendEmail = (data)=>axios.post('/api/sendEmails',data);

const getBookingList = (userEmail)=>axiosClient.get('/appointments?[filters][Email][$eq]='+userEmail+'&populate[doctor][populate][Image][populate]=url&populate=*');

const deleteBooking = (id)=>axiosClient.delete('/appointments/'+id);

export default{
    getCategory,
    getDoctorList,
    getDoctorByCategory,
    getDoctorById,
    bookAppointment,
    getAppointment,
    sendEmail,
    getBookingList,
    deleteBooking
}