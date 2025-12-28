import apiClient from "./ApiClient";

export const authService ={
    login: async(credential)=>{
        const {data} = await apiClient.post('/login', credential)
        return data;
    },
    register: async(userData)=>{
        const {data} = await apiClient.post('/register', userData)
        return data;
    },
    updateUser: async(userData, id)=>{
          const {data} = await apiClient.put(`/update/${id}`, userData)
        return data;
    },
    getSingleUser: async(id)=> {
        const {data} = await apiClient.get(`/getSingleUser/${id}`)
        return data
    },
    task: async(userData)=>{
        const {data} = await apiClient.post('/create-task', userData)
        return data
    },
    getTask: async()=>{
        const {data} = await apiClient.get('/getUserTask')
        return data;
    },
    getSingleTask: async(id)=>{
        const {data} = await apiClient.get(`/getSingleTask/${id}`)
        return data
    },
    deleteTask: async(id)=>{
        const {data} = await apiClient.delete(`/delete-task/${id}`)
        return data
    },
    updateTask: async(taskData, id)=>{
         const {data} = await apiClient.put(`/update-task/${id}`, taskData)
        return data
    },
    updateStatus: async(id, status)=>{
         const {data} = await apiClient.patch(`/update-status/${id}`, status)
        return data
    }
}