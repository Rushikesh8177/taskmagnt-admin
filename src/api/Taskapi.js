import axiosInstance from "./api";

export const  registerUser =(data) => axiosInstance.post('/user/registor', data)
export const loginUser = (data) => axiosInstance.post('/user/login', data)
export const getUserInfo = (id) => axiosInstance.get('/user/getuserinfo', id)

export const verifyOtp = (data) => axiosInstance.post(`/user/verifyOtp`, data);

// ✅ Update user by ID
export const updateUser = (id, data) => axiosInstance.put(`/user/updateUser/${id}`, data);

// ✅ Delete user by ID
export const deleteUser = (id) => axiosInstance.delete(`/user/deleteUser/${id}`);

export const createUser = (data) => axiosInstance.post("/user/createUser", data);

export const getAllUsers= ()=> axiosInstance.get("/user/admin/getAllUsers")





// ✅ Create a new task (Admin only)
export const createTask = (data) => {
  return axiosInstance.post("/task/createTask", data);
};

// ✅ Get all tasks
export const getAllTasks = () => {
  return axiosInstance.get("/task/getAllTask");
};

// ✅ Get single task by ID
export const getTaskById = (id) => {
  return axiosInstance.get(`/task/getTaskById/${id}`);
};

// ✅ Update task (Admin only)
export const updateTask = (id, data) => {
  return axiosInstance.put(`/task/updateTask/${id}`, data);
};

// ✅ Delete task (Admin only)
export const deleteTask = (id) => {
  return axiosInstance.delete(`/task/deleteTask/${id}`);
};

// ✅ Update only task status (User or Admin)
export const updateTaskStatus = (id, status) => {
  return axiosInstance.patch(`/task/updateTaskStatus/${id}`, { status });
};









// ✅ Create a new project (Admin only)
export const createProject = (data) =>
  axiosInstance.post("/project/createProject", data);

// ✅ Get all projects
export const getAllProjects = () =>
  axiosInstance.get("/project/getAllProject");

export const getProjectById =() =>
  axiosInstance.get(`/project/getProjectById/${id}`)

// export const updateProject =() =>
//   axiosInstance.get(`/project/updateProject/${id}`)

export const updateProject = async (id, data) => {
  axiosInstance.put(`/project/updateProject/${id}`, data);
};

export const deleteProject = async (id) => {
  axiosInstance.delete(`/project/deleteProject/${id}`);
};





// ✅ Get all users (admin only)
// export const getAllUsers = () => axiosInstance.get("/user/admin/getAllUsers");

// ✅ Register new user
export const registorUser = (data) =>
  axiosInstance.post("/user/registor", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
