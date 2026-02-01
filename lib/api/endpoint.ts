export const API_ENDPOINTS = {
  // serial number endpoints
  SERIALNUMBER: {
    GET_ALL: "/serial",
    GET_BY_ID: (id: string) => `/serial/${id}`,
    CREATE: "/serial",
    UPDATE: (id: string) => `/serial/${id}`,
    UPDATECURRENTNUMVER: (id: string) => `/serial/current/${id}`,
    DELETE: (id: string) => `/serial/${id}`,
  },
  UNITS: {
    GET_ALL: "/unit",
    GET_BY_ID: (id: string) => `/unit/${id}`,
    CREATE: "/unit",
    UPDATE: (id: string) => `/unit/${id}`,
    DELETE: (id: string) => `/unit/${id}`,
  },
  AREA: {
    GET_ALL: "/area",
    GET_BY_ID: (id: string) => `/area/${id}`,
    CREATE: "/area",
    UPDATE: (id: string) => `/area/${id}`,
    DELETE: (id: string) => `/area/${id}`,
  },
  CITY: {
    GET_ALL: "/city",
    GET_BY_ID: (id: string) => `/city/${id}`,
    CREATE: "/city",
    UPDATE: (id: string) => `/city/${id}`,
    DELETE: (id: string) => `/city/${id}`,
  },
  VENDOR: {
    GET_ALL: "/vendor",
    GET_BY_ID: (id: string) => `/vendor/${id}`,
    CREATE: "/vendor",
    UPDATE: (id: string) => `/vendor/${id}`,
    DELETE: (id: string) => `/vendor/${id}`,
  },
  VENDORCATEGORY: {
    GET_ALL: "/vendorCategory",
    GET_BY_ID: (id: string) => `/vendorCategory/${id}`,
    CREATE: "/vendorCategory",
    UPDATE: (id: string) => `/vendorCategory/${id}`,
    DELETE: (id: string) => `/vendorCategory/${id}`,
  },
  COMPANY: {
    GET_ALL: "/company",
    GET_BY_ID: (id: string) => `/company/${id}`,
    CREATE: "/company",
    UPDATE: (id: string) => `/company/${id}`,
    DELETE: (id: string) => `/company/${id}`,
    },

}