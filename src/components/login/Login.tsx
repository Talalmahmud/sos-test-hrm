"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { redirect, useRouter } from "next/navigation";

import { getSession, userLogin } from "@/utils/commonfunction";
import { AuthContext } from "../ContextProvider";
import PageLoader from "../PageLoader";
import { toast } from "react-toastify";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [emptyCheck, setEmptyCheck] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setUserData = async () => {
    const d = await getSession();
    setUser(d);
  };
  const newLogin = async () => {
    if (phone !== "" && password !== "") {
      setEmptyCheck(false);
      setIsLoading(true);
      const isSuccess = await userLogin(phone, password);
      if (isSuccess) {
        setUserData();
        router.push("/management/dashboard/admin");
        toast.success("User login is success.");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setUserData();
        toast.error(
          "User password or email or phone number is wrong. Please try again"
        );
        router.push("/");
      }
    } else {
      setEmptyCheck(true);
    }

    // logIn(email, password);
  };
  const handleKeyPress = async (event: any) => {
    // Check if the pressed key is "Enter"
    if (event.key === "Enter") {
      // Log the input value to the console
      await newLogin();
    }
  };

  // const test = async () => {
  //   try {
  //     const res = await fetch(
  //       "http://192.168.0.150:8000/api/v1/employee/login/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email: "admin@gmail.com",
  //           password: "123",
  //         }),
  //       }
  //     );

  //     const resData = await res.json();
  //     console.log(resData);
  //     return await resData.data;
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // };
  // useEffect(() => {
  //   test();
  // }, []);
  // const userLogin = async () => {
  //   try {
  //     const res = await axios.post(
  //       EndPoint.LOGIN_API,
  //       {
  //         email: email,
  //         password: password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(res.data);
  //     router.push("/management/dashboard/admin");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const loginClick = () => {
    router.push("/management/dashboard/admin");
  };

  return (
    <>
      <div className=" h-[40px] w-[124px] relative overflow-auto">
        <Image src={"/assets/sos_logo.svg"} alt="sosLogo" fill priority />
      </div>
      {/* <button onClick={() => userLogin()}>Setcookie</button> */}
      <div className=" mt-[16px] xl:mt-[36px] w-[354px] md:w-[736px] xl:w-[1142px] flex flex-col xl:flex-row justify-center xl:justify-between items-center mx-auto">
        <div className=" w-full md:w-[728px] flex items-center justify-center">
          <div className=" w-[443px] xl:w-[396px] flex flex-col  gap-[8px] xl:gap-[44px] ">
            <div>
              <p className=" text-black text-[31px] xl:text-[61px] font-[600px]">
                Sign in to
              </p>
              <p className=" text-[20px] xl:text-[39px]">
                <span className=" text-orange ">Softmax</span> is simply
              </p>
            </div>
            {/* <div className=" flex flex-col text-[13px] xl:text-[16px] ">
                  <p>If you already have an account </p>
                  {isLogin ? (
                    <p onClick={() => setIsLogin(false)}>
                      You can{" "}
                      <span className="text-orange cursor-pointer">
                        Register here !
                      </span>
                    </p>
                  ) : (
                    <p onClick={() => setIsLogin(true)}>
                      You can{" "}
                      <span className="text-orange cursor-pointer">
                        Login here !
                      </span>
                    </p>
                  )}
                </div> */}
          </div>
          <div className=" hidden xl:block w-[332px] h-[332px] relative overflow-auto">
            <Image
              src={"/icons/login_img.svg"}
              alt="loginImage"
              fill
              priority
            />
          </div>
        </div>
        {isLogin ? (
          <div className=" w-[343px] xl:w-[326px]">
            <p className=" hidden xl:block text-[32px] text-black font-[600px] mb-[16px] xl:mb-[28px]">
              Sign in
            </p>
            <div className=" flex flex-col gap-[16px] xl:gap-[16px] w-full mt-[32px] xl:mt-[0px]">
              <InputField
                inpputValue={phone}
                inputName="phone"
                inputPlaceHolder="Enter phone number"
                iconShow={false}
                isShow={false}
                setIsShow={setShow}
                setInputValue={setPhone}
              />
              {emptyCheck && phone === "" && (
                <p className="text-orange text-[12px]">
                  Please add a phone number
                </p>
              )}
              <InputField
                inpputValue={password}
                inputName="email"
                inputPlaceHolder="Enter your password"
                iconShow={false}
                isShow={true}
                setIsShow={setShow}
                setInputValue={setPassword}
                enterPress={handleKeyPress}
              />
              {emptyCheck && password === "" && (
                <p className=" text-orange text-[12px]">
                  Please enter a password
                </p>
              )}
            </div>
            <p className=" text-right mt-[16px] mb-[32px] hover:underline cursor-pointer">
              Forgot password?
            </p>

            {isLoading ? (
              <button className=" w-[342px] hover:bg-green xl:w-[326px] h-[52px] font-[16px] cursor-pointer rounded-[8px] bg-orange text-white flex items-center justify-center ">
                Logging...
              </button>
            ) : (
              <Button onClickFunction={newLogin} title="Login" />
            )}
          </div>
        ) : (
          <div className=" w-[343px] xl:w-[326px]">
            <p className=" hidden xl:block text-[32px] text-black font-[600px] mb-[16px] xl:mb-[28px]">
              Sign up
            </p>
            <div className=" flex flex-col gap-[20px] w-full mt-[32px] xl:mt-[0px]">
              <InputField
                inpputValue={email}
                inputName="email"
                inputPlaceHolder="Enter email or phone"
                iconShow={false}
                isShow={false}
                setIsShow={setShow}
                setInputValue={setEmail}
              />
              <InputField
                inpputValue={email}
                inputName="email"
                inputPlaceHolder="Enter email or phone"
                iconShow={false}
                isShow={false}
                setIsShow={setShow}
                setInputValue={setEmail}
              />
              <InputField
                inpputValue={email}
                inputName="email"
                inputPlaceHolder="Enter email or phone"
                iconShow={false}
                isShow={false}
                setIsShow={setShow}
                setInputValue={setEmail}
              />
              <InputField
                inpputValue={email}
                inputName="email"
                inputPlaceHolder="Enter email or phone"
                iconShow={false}
                isShow={false}
                setIsShow={setShow}
                setInputValue={setEmail}
              />
              <InputField
                inpputValue={email}
                inputName="email"
                inputPlaceHolder="Enter email or phone"
                iconShow={false}
                isShow={false}
                setIsShow={setShow}
                setInputValue={setEmail}
              />
            </div>
            <p className=" mb-[16px] xl:mb-[20px]"></p>

            <Button onClickFunction={loginClick} title="Register" />
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
