"use server";

import axios from "axios";
import { EndPoint } from "./api";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// const authToken = "Token " + data?.user?.token;
interface LoginResponse {
  success: boolean;
  [key: string]: any; // Other response data
}

export async function getEmployees() {
  const res = await axios.get(EndPoint.GET_ALL_EMPLOY);
  const resData = await res.data;
  return resData;
}

// const getRequest = async (apiLink: string, paramsData: any) => {
//   await axios
//     .get(apiLink, {
//       params: paramsData,
//     })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return error;
//     });
// };

// const postRequest = async (apiLink: string, bodyData: any) => {
//   await axios
//     .post(apiLink, bodyData)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return error;
//     });
// };

// const authGetRequest = async (apiLink: string, paramsData: any) => {
//   await axios
//     .get(apiLink, {
//       headers: {
//         Authorization: authToken,
//       },
//       params: {
//         paramsData,
//       },
//     })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return error;
//     });
// };

// const authPostRequest = async (apiLink: string, bodyData: any) => {
//   await axios
//     .post(apiLink, bodyData, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: authToken,
//       },
//     })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return error;
//     });
// };
// export const AuthService = {
//   get: authGetRequest,
//   post: authPostRequest,
// };

// export const Service = {
//   get: getRequest,
//   post: postRequest,
// };

export const userLogin = async (
  phone: string,
  password: string
): Promise<boolean> => {
  try {
    const { data }: { data: LoginResponse } = await axios.post(
      EndPoint.LOGIN_API,
      {
        phone_number: phone,
        password: password,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    if (data.success) {
      const jwtData = jwt.sign(data, "talalmahmud");

      cookies().set("token", jwtData, {
        maxAge: 1000 * 60 * 30, // 30 minutes
        httpOnly: true,
        secure: true,
      });

      return true;
    }

    console.log("Unauthorized user");
    return false;
  } catch (error) {
    console.error("Error logging in:", error);
    return false;
  }
};

// export const oldUserLogin = async (phone: any, password: any) => {
//   const res = await axios.post(
//     EndPoint.LOGIN_API,
//     {
//       phone_number: phone,
//       password: password,
//     },
//     {
//       headers: {
//         "Cache-Control": "no-store",
//       },
//     }
//   );
//   const resData = await res.data;
//   if (resData?.phone_number) {
//     const jwtData = jwt.sign(resData, "talalmahmud");

//     cookies().set("token", jwtData, {
//       maxAge: 1000 * 60 * 30,
//       httpOnly: true,
//       secure: true,
//     });
//     return true;
//     // redirect("/management/dashboard/admin");
//   } else {
//     console.log("Unauthorized user");
//     return false;
//   }
// };

// const getUserPermissions = async (id: any) => {
//   const res = await axios.get(EndPoint.ADD_BOOK);
// };

export const getSession = async () => {
  const cokieStore = cookies();
  const getCookie: any = cokieStore.get("token");
  if (getCookie) {
    const decodetData = jwt.verify(getCookie?.value, "talalmahmud");
    return decodetData;
  } else {
    return null;
  }
};

export const userLogOut = async () => {
  cookies().delete("token");
};
