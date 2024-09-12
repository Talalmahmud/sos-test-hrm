"use server";
import axios from "axios";

export const ApiGet = async (
  url: string,
  urlParams?: any,
  authHeader?: string
) => {
  // console.log(url, urlParams, authHeader);
  try {
    if (authHeader) {
      const res = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + authHeader,
        },

        params: urlParams,
      });
      const resResult = await res.data;
      return { resData: resResult, success: true };
    }
    const res = await axios.get(url, { params: urlParams });
    const resResult = await res.data;
    return { resData: resResult, success: true };
  } catch (error) {
    console.log(error);
    return { resData: error, success: false };
  }
};
export const ApiPost = async (
  url: string,
  bodyData: any,
  urlParams: any,
  authHeader?: string
) => {
  try {
    if (authHeader) {
      const res = await axios.post(url, bodyData, {
        headers: {
          Authorization: "Bearer " + authHeader,
          "Cache-Control": "no-store",
        },
      });
      const resResult = await res.data;
      return { resData: resResult, success: true };
    }
    const res = await axios.post(url, bodyData, {
      headers: { Authorization: "Bearer " + authHeader },
    });
    const resResult = await res.data;
    return { resData: resResult, success: true };
  } catch (error: any) {
    console.log(error);

    if (error?.response) {
      const responseError = Object.values(error.response.data.join(""));
      return { resData: responseError, success: false };
    } else {
      return { resData: "Server unexpected error!", success: false };
    }
  }
};

export const ApiUpdate = async (
  url: string,
  authHeader: string,
  bodyData: any
) => {
  try {
    if (authHeader !== "") {
      const res = await axios.patch(url, bodyData, {
        headers: {
          Authorization: "Bearer " + authHeader,
          "Cache-Control": "no-store",
        },
      });
      const resResult = await res.data;
      return { resData: resResult, success: true };
    }
    const res = await axios.patch(url, bodyData);
    const resResult = await res.data;
    return { resData: resResult, success: true };
  } catch (error: any) {
    if (error?.response) {
      const responseError = Object.values(error?.response?.data?.join(""));
      return { resData: responseError, success: false };
    } else {
      return { resData: "Server unexpected error!", success: true };
    }
  }
};

export const ApiDelete = async (url: string, id: any, authHeader?: string) => {
  try {
    if (authHeader) {
      const res = await axios.delete(url + id, {
        headers: {
          Authorization: "Bearer " + authHeader,
          "Cache-Control": "no-store",
        },
      });
      const resResult = await res.data;
      return { resData: resResult, success: true };
    }
    const res = await axios.delete(url + id);
    const resResult = await res.data;
    return { resData: resResult, success: true };
  } catch (error: any) {
    if (error?.response) {
      const responseError = Object.values(error.response.data.join(""));
      return { resData: responseError, success: false };
    } else {
      return { resData: "Server unexpected error!", success: false };
    }
  }
};
