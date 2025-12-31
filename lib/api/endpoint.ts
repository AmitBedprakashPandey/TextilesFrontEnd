export const API_ENDPOINTS = {
  // serial number endpoints
  SERIALNUMBER: {
    GET_ALL: "/serial",
    GET_BY_ID: (id: string) => `/serial/${id}`,
    CREATE: "/serial",
    UPDATE: (id: string) => `/serial/${id}`,
    DELETE: (id: string) => `/serial/${id}`,
  },



}