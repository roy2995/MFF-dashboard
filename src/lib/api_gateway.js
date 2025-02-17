const api_url = "http://192.168.68.112:8080";

// Función auxiliar para realizar la llamada a la API con timeout y manejo de errores
const apiCall = async (
  endpoint,
  { method = "GET", body = null, tokenRequired = true, timeout = 10000 } = {}
) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(tokenRequired && token && { Authorization: `Bearer ${token}` }),
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${api_url}/${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Sesión expirada");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la solicitud");
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

// Función auxiliar para construir el payload del usuario para la creación
const buildUserPayloadForCreate = (userData) => ({
  username: userData.username,
  usuarioDetalle: {
    usersRoles: [{ id: 1 }],
    allName: userData.fullName,
    cip: userData.dni,
    address: userData.direction,
    phone: userData.phone,
    email: userData.email,
    dateOfBirth: userData.dateBorn,
    bloodType: userData.bloodType,
    emergencyContact: userData.emergencyContactName,
    emergencyPhone: userData.emergencyContactPhone,
    cargo: userData.cargo && userData.cargo.id ? userData.cargo : { id: userData.cargoId || 2 },
    photo: userData.profilePicture,
  },
  authorities: null,
  enabled: true,
  accountNonLocked: true,
  credentialsNonExpired: true,
  accountNonExpired: true,
});

// Función auxiliar para construir el payload del usuario para actualización
const buildUserPayloadForUpdate = (userData) => ({
  username: userData.username,
  password: userData.password,
  usuarioDetalle: {
    usersRoles: [{ id: 1 }, { id: 2 }],
    allName: userData.fullName,
    cip: userData.dni,
    address: userData.direction,
    phone: userData.phone,
    email: userData.email,
    dateOfBirth: userData.dateBorn,
    bloodType: userData.bloodType,
    emergencyContact: userData.emergencyContactName,
    emergencyPhone: userData.emergencyContactPhone,
    cargo: userData.cargo,
    photo: userData.profilePicture,
  },
  authorities: null,
  enabled: true,
  accountNonLocked: true,
  credentialsNonExpired: true,
  accountNonExpired: true,
});

// Función para iniciar sesión (no requiere token)
export const signIn = async (path, username, password) => {
  return await apiCall(path, {
    method: "POST",
    body: { username, password },
    tokenRequired: false,
  });
};

// Función para obtener todos los usuarios
export const fetchUsers = async () => {
  return await apiCall("api/v1/users/", { method: "GET" });
};

// Función para obtener un usuario por username (para cargar datos en el formulario de edición)
export const fetchUserByUsername = async (username) => {
  return await apiCall(`api/v1/users/username/${username}`, { method: "GET" });
};

// Función para crear un nuevo usuario (POST)
export const createUser = async (userData) => {
  const payload = buildUserPayloadForCreate(userData);
  return await apiCall("api/v1/users/", { method: "POST", body: payload });
};

// Función para actualizar un usuario existente (PUT)
export const updateUser = async (userData) => {
  const payload = buildUserPayloadForUpdate(userData);
  return await apiCall("api/v1/users/", { method: "PUT", body: payload });
};

// Función para eliminar un usuario utilizando el username
// Primero se hace un GET para extraer el id y luego se elimina
export const deleteUserByUsername = async (username) => {
  // Obtener el usuario por username
  const user = await fetchUserByUsername(username);
  if (!user || !user.id) {
    throw new Error("No se encontró el usuario o el ID del usuario.");
  }
  // Realizar la eliminación utilizando el id obtenido
  return await apiCall(`api/v1/users/delete/${user.id}`, { method: "DELETE" });
};