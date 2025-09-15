export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        LOGIN: `/api/auth/login`,
        SIGNUP: `/api/auth/register`,   // was signup → should be register
        GET_USER_INFO: `/api/auth/getUser`, // was getUserInfo → should be getUser
    },
    DataTransfer: {
        GET_DATA: `/api/dashboard/`
    },
    INCOME: {
        ADD_INCOME: `/api/income/add`,
        GET_INCOME: `/api/income/get`,
        DELETE_INCOME: (incomeId) => `/api/income/${incomeId}`, // Append income ID
        // DOWNLOAD_INCOME: `/api/income/download`
    },
    EXPENSE: {
        ADD_EXPENSE: `/api/expense/add`,
        GET_EXPENSE: `/api/expense/get`,
        DELETE_EXPENSE: (expenseId) => `/api/expense/${expenseId}`, // Append expense ID
        // DOWNLOAD_EXPENSE: `/api/expense/download`
    },
    IMAGE : {
        UPLOAD_IMAGE: `/api/auth/uploadProfileImage`
    }
};

