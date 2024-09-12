import Link from "next/link";
import React from "react";

type Props = {};

const OthersDropdown = (props: Props) => {
  return (
    <div className=" top-[56px] bg-orange border-[1px] absolute left-0 w-[260px] flex flex-col gap-[24px] rounded-[16px] p-[24px]  shadow-md text-white">
      <div className=" flex items-center gap-x-[20px] text-[20px] w-[212px] justify-left pl-[16px]  h-[4opx]">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M23.7723 22.6943L17.5759 16.5969C19.1985 14.834 20.1955 12.5024 20.1955 9.93682C20.1947 4.44852 15.6742 0 10.0974 0C4.52055 0 0 4.44852 0 9.93682C0 15.4251 4.52055 19.8736 10.0974 19.8736C12.5069 19.8736 14.7169 19.0402 16.4529 17.6546L22.6733 23.776C22.9764 24.0746 23.4685 24.0746 23.7716 23.776C23.8437 23.7056 23.901 23.6215 23.9401 23.5287C23.9792 23.4358 23.9994 23.3361 23.9995 23.2353C23.9996 23.1345 23.9795 23.0348 23.9405 22.9419C23.9015 22.849 23.8443 22.7648 23.7723 22.6943ZM10.0974 18.3448C5.37877 18.3448 1.55362 14.5804 1.55362 9.93682C1.55362 5.29321 5.37877 1.52884 10.0974 1.52884C14.816 1.52884 18.6411 5.29321 18.6411 9.93682C18.6411 14.5804 14.816 18.3448 10.0974 18.3448Z"
              fill="#FBFBFB"
            />
          </svg>
        </div>
        <p className=" ">Search</p>
      </div>{" "}
      <Link href={"/management/student/register"}>
        <div className=" flex items-center gap-x-[20px] text-[20px] w-[212px] justify-left pl-[16px]  h-[4opx]">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 0C5.3828 0 0 5.3828 0 12C0 18.6172 5.3828 24 12 24C18.6172 24 24 18.6163 24 12C24 5.38373 18.6172 0 12 0ZM12 22.141C6.40898 22.141 1.85902 17.592 1.85902 12C1.85902 6.40805 6.40898 1.85902 12 1.85902C17.591 1.85902 22.141 6.40805 22.141 12C22.141 17.592 17.592 22.141 12 22.141Z"
                fill="#FBFBFB"
              />
              <path
                d="M16.6485 10.9868H12.9305V7.26876C12.9305 6.75567 12.515 6.33923 12.0009 6.33923C11.4869 6.33923 11.0714 6.75567 11.0714 7.26876V10.9868H7.35336C6.83933 10.9868 6.42383 11.4032 6.42383 11.9163C6.42383 12.4294 6.83933 12.8459 7.35336 12.8459H11.0714V16.5639C11.0714 17.077 11.4869 17.4934 12.0009 17.4934C12.515 17.4934 12.9305 17.077 12.9305 16.5639V12.8459H16.6485C17.1625 12.8459 17.578 12.4294 17.578 11.9163C17.578 11.4032 17.1625 10.9868 16.6485 10.9868Z"
                fill="#FBFBFB"
              />
            </svg>
          </div>

          <p className=" ">Add Student</p>
        </div>{" "}
      </Link>
      <div className=" flex items-center gap-x-[20px] text-[20px] w-[212px] justify-left pl-[16px]  h-[4opx]">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              d="M15 0.219971H7C2.584 0.219971 0.25 2.55397 0.25 6.96997V11.97C0.25 17.59 2.832 18.72 7 18.72H7.497C7.57221 18.736 7.64229 18.7703 7.701 18.82L9.201 20.82C9.39912 21.1155 9.66698 21.3578 9.98091 21.5253C10.2948 21.6928 10.6452 21.7804 11.001 21.7804C11.3568 21.7804 11.7072 21.6928 12.0211 21.5253C12.335 21.3578 12.6029 21.1155 12.801 20.82L14.301 18.82C14.3242 18.7888 14.3544 18.7635 14.3891 18.7462C14.4238 18.7288 14.4622 18.7198 14.501 18.72H14.999C19.415 18.72 21.749 16.386 21.749 11.97L21.75 6.96997C21.75 2.55397 19.417 0.219971 15 0.219971ZM20.25 11.97C20.25 15.552 18.581 17.22 15 17.22H14.5C14.2286 17.2207 13.961 17.2842 13.7183 17.4057C13.4756 17.5271 13.2643 17.7032 13.101 17.92L11.601 19.92C11.5404 20.0257 11.453 20.1136 11.3476 20.1748C11.2421 20.2359 11.1224 20.2681 11.0005 20.2681C10.8786 20.2681 10.7589 20.2359 10.6534 20.1748C10.548 20.1136 10.4606 20.0257 10.4 19.92L8.9 17.92C8.73157 17.7085 8.51906 17.5363 8.27726 17.4154C8.03547 17.2945 7.77022 17.2278 7.5 17.22H7C3.297 17.22 1.75 16.49 1.75 11.97V6.96997C1.75 3.38797 3.418 1.71997 7 1.71997H15C18.582 1.71997 20.25 3.38797 20.25 6.96997V11.97ZM12 9.96997C12.0004 10.1012 11.9749 10.2311 11.925 10.3524C11.875 10.4737 11.8017 10.584 11.709 10.6769C11.6164 10.7698 11.5064 10.8435 11.3852 10.8938C11.2641 10.9441 11.1342 10.97 11.003 10.97H10.998C10.8003 10.9696 10.6072 10.9106 10.443 10.8005C10.2788 10.6903 10.1509 10.534 10.0755 10.3513C10.0002 10.1685 9.98065 9.96751 10.0195 9.77366C10.0583 9.57981 10.1537 9.40181 10.2936 9.26216C10.4335 9.12251 10.6117 9.02746 10.8056 8.98904C10.9996 8.95062 11.2005 8.97054 11.3831 9.04628C11.5658 9.12203 11.7218 9.2502 11.8316 9.41461C11.9414 9.57901 12 9.77227 12 9.96997ZM16 9.96997C16.0004 10.1012 15.9749 10.2311 15.925 10.3524C15.875 10.4737 15.8017 10.584 15.709 10.6769C15.6164 10.7698 15.5064 10.8435 15.3852 10.8938C15.2641 10.9441 15.1342 10.97 15.003 10.97H14.998C14.8003 10.9696 14.6072 10.9106 14.443 10.8005C14.2788 10.6903 14.1509 10.534 14.0755 10.3513C14.0002 10.1685 13.9806 9.96751 14.0195 9.77366C14.0583 9.57981 14.1537 9.40181 14.2936 9.26216C14.4335 9.12251 14.6117 9.02746 14.8056 8.98904C14.9996 8.95062 15.2005 8.97054 15.3831 9.04628C15.5658 9.12203 15.7218 9.2502 15.8316 9.41461C15.9414 9.57901 16 9.77227 16 9.96997ZM8 9.96997C8.00039 10.1012 7.9749 10.2311 7.92497 10.3524C7.87504 10.4737 7.80167 10.584 7.70905 10.6769C7.61643 10.7698 7.50639 10.8435 7.38523 10.8938C7.26407 10.9441 7.13418 10.97 7.003 10.97H6.998C6.8003 10.9696 6.60716 10.9106 6.44298 10.8005C6.27879 10.6903 6.15093 10.534 6.07555 10.3513C6.00017 10.1685 5.98065 9.96751 6.01946 9.77366C6.05827 9.57981 6.15367 9.40181 6.2936 9.26216C6.43353 9.12251 6.61172 9.02746 6.80564 8.98904C6.99957 8.95062 7.20053 8.97054 7.38314 9.04628C7.56575 9.12203 7.72181 9.2502 7.83161 9.41461C7.9414 9.57901 8 9.77227 8 9.96997Z"
              fill="#FBFBFB"
            />
          </svg>
        </div>
        <p className=" ">SMS</p>
      </div>
      <div className=" flex items-center gap-x-[20px] text-[20px] w-[212px] justify-left pl-[16px]  h-[4opx]">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M17.0451 11.5087C16.7553 11.0275 16.5694 10.4911 16.4991 9.93375C16.4991 3.249 14.0458 0 8.99906 0C3.95231 0 1.49906 3.249 1.49906 9.933C1.42876 10.4903 1.24279 11.0268 0.953063 11.508C0.527063 12.3675 0.0448126 13.3418 0.611813 14.2552C1.12181 15.0802 2.33681 15.675 6.09881 15.8647C6.29137 16.4834 6.67668 17.0242 7.19847 17.4083C7.72025 17.7923 8.35117 17.9995 8.99906 17.9995C9.64696 17.9995 10.2779 17.7923 10.7997 17.4083C11.3214 17.0242 11.7068 16.4834 11.8993 15.8647C15.6643 15.675 16.8763 15.0772 17.3863 14.2552C17.9533 13.3425 17.4741 12.3682 17.0451 11.5087ZM10.2328 15.9338C10.0807 16.1125 9.89164 16.256 9.67862 16.3544C9.46559 16.4529 9.23373 16.5039 8.99906 16.5039C8.7644 16.5039 8.53253 16.4529 8.31951 16.3544C8.10649 16.256 7.91739 16.1125 7.76531 15.9338H10.2328ZM16.1121 13.4692C15.9321 13.7587 14.8783 14.4338 8.99906 14.4338C3.11981 14.4338 2.06606 13.7587 1.88606 13.4692C1.75931 13.2638 2.05706 12.6623 2.29706 12.1785C2.70113 11.4942 2.94139 10.7256 2.99906 9.933C2.99906 4.101 4.84931 1.5 8.99906 1.5C13.1488 1.5 14.9991 4.101 14.9991 9.933C15.0573 10.7243 15.2975 11.4915 15.7011 12.1747C15.9411 12.6585 16.2388 13.26 16.1121 13.4655V13.4692Z"
              fill="#FBFBFB"
            />
          </svg>
        </div>
        <p className=" ">Notice</p>
      </div>
      <div className=" flex items-center gap-x-[20px] text-[20px] w-[212px] justify-left pl-[16px]  h-[4opx]">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M1 20H11.41C11.6752 20 11.9296 19.8946 12.1171 19.7071C12.3046 19.5196 12.41 19.2652 12.41 19C12.41 18.7348 12.3046 18.4804 12.1171 18.2929C11.9296 18.1054 11.6752 18 11.41 18H2V17C2.00159 15.6744 2.52888 14.4036 3.46622 13.4662C4.40356 12.5289 5.67441 12.0016 7 12H11C12.0823 11.9973 13.1358 12.3485 14 13C14.2122 13.1591 14.4789 13.2275 14.7414 13.19C15.004 13.1524 15.2409 13.0122 15.4 12.8C15.5591 12.5878 15.6275 12.3211 15.59 12.0586C15.5524 11.796 15.4122 11.5591 15.2 11.4C13.99 10.488 12.5152 9.99637 11 10H7C5.14413 10.0021 3.36489 10.7403 2.05259 12.0526C0.740295 13.3649 0.00211736 15.1441 0 17V19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20ZM13.5 4.5C13.5 3.60999 13.2361 2.73996 12.7416 1.99994C12.2471 1.25991 11.5443 0.683138 10.7221 0.342544C9.89981 0.00194976 8.99501 -0.0871652 8.12209 0.0864683C7.24918 0.260102 6.44736 0.688685 5.81802 1.31802C5.18868 1.94736 4.7601 2.74918 4.58647 3.6221C4.41283 4.49501 4.50195 5.39981 4.84254 6.22208C5.18314 7.04434 5.75991 7.74715 6.49994 8.24162C7.23996 8.73608 8.10999 9 9 9C10.1931 8.99868 11.3369 8.52415 12.1805 7.68052C13.0241 6.83689 13.4987 5.69307 13.5 4.5ZM6.5 4.5C6.5 4.00555 6.64662 3.5222 6.92133 3.11108C7.19603 2.69995 7.58648 2.37952 8.04329 2.1903C8.50011 2.00108 9.00278 1.95158 9.48773 2.04804C9.97268 2.1445 10.4181 2.3826 10.7678 2.73223C11.1174 3.08187 11.3555 3.52732 11.452 4.01228C11.5484 4.49723 11.4989 4.9999 11.3097 5.45671C11.1205 5.91353 10.8 6.30397 10.3889 6.57868C9.9778 6.85338 9.49445 7 9 7C8.3372 6.99921 7.70178 6.73556 7.23311 6.26689C6.76444 5.79822 6.50079 5.1628 6.5 4.5Z"
              fill="#FBFBFB"
            />
            <path
              d="M18.2924 14.293L15.9994 16.586L14.7064 15.293C14.5178 15.1109 14.2652 15.0101 14.003 15.0124C13.7408 15.0146 13.49 15.1198 13.3046 15.3052C13.1192 15.4906 13.014 15.7414 13.0118 16.0036C13.0095 16.2658 13.1103 16.5184 13.2924 16.707L15.2924 18.707C15.48 18.8945 15.7343 18.9998 15.9994 18.9998C16.2646 18.9998 16.5189 18.8945 16.7064 18.707L19.7064 15.707C19.8886 15.5184 19.9894 15.2658 19.9871 15.0036C19.9848 14.7414 19.8797 14.4906 19.6942 14.3052C19.5088 14.1198 19.258 14.0146 18.9958 14.0124C18.7336 14.0101 18.481 14.1109 18.2924 14.293Z"
              fill="#FBFBFB"
            />
          </svg>
        </div>
        <p className=" ">Attendance</p>
      </div>
      <div className=" flex items-center gap-x-[20px] text-[20px] w-[212px] justify-left pl-[16px]  h-[4opx]">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
          >
            <path
              d="M19.6577 5.06883C16.8497 4.12323 12.9617 2.56803 10.3601 0.556834C10.2978 0.508261 10.2214 0.48148 10.1425 0.480613C10.0635 0.479745 9.98652 0.50484 9.92326 0.552034L9.84646 0.614434C9.82726 0.624034 9.80805 0.638434 9.78886 0.652834C6.92806 2.81763 4.09126 4.05603 0.457656 5.34723C0.361656 5.34723 0.270456 5.38563 0.198456 5.45283C0.131256 5.52003 0.0976562 5.61603 0.0976562 5.71203C0.131256 9.32643 1.17286 12.8256 3.18886 16.1136C4.84966 18.8736 7.11526 21.3408 9.92326 23.448C9.98566 23.496 10.0625 23.52 10.1393 23.52C10.2161 23.52 10.2929 23.496 10.3553 23.448C16.3121 18.984 19.7921 12.6192 19.9025 5.97603V5.40963C19.9025 5.25603 19.8017 5.12163 19.6577 5.06883ZM10.1393 20.8656C8.05126 19.1232 6.33766 17.1504 5.03686 14.9952C3.46726 12.4368 2.55526 9.73443 2.31526 6.96963C5.60806 5.74563 7.97926 4.56003 10.1489 3.05763C12.0977 4.34403 14.6417 5.55843 17.7137 6.67683C17.4113 11.9232 14.6657 17.0688 10.1393 20.8656Z"
              fill="#FBFBFB"
            />
            <path
              d="M16.3065 9.09121V10.9824C16.3065 11.0779 16.2686 11.1695 16.2011 11.237C16.1335 11.3045 16.042 11.3424 15.9465 11.3424C15.851 11.3424 15.7594 11.3045 15.6919 11.237C15.6244 11.1695 15.5865 11.0779 15.5865 10.9824V9.69601L14.6697 10.176C14.6745 10.2 14.6841 10.224 14.6841 10.2528V13.1808C14.6841 13.3344 14.5929 13.464 14.4537 13.5216C12.9801 14.0832 11.4969 14.3664 10.0089 14.3664C8.5257 14.3664 7.0425 14.0832 5.5689 13.5216C5.50071 13.4945 5.44226 13.4475 5.40116 13.3867C5.36006 13.3259 5.33823 13.2542 5.3385 13.1808V10.2528C5.3385 10.224 5.3481 10.2 5.3529 10.176L3.9129 9.41761C3.85325 9.38699 3.80354 9.34005 3.76955 9.28226C3.73555 9.22447 3.71868 9.15822 3.7209 9.09121C3.7209 8.95681 3.8025 8.83201 3.9225 8.77441L9.4569 6.09601C9.7689 5.94241 10.1481 5.92801 10.4697 6.06241C10.4937 6.07201 10.5177 6.07681 10.5321 6.08641L16.1001 8.77441C16.1337 8.78881 16.1673 8.81281 16.1913 8.84161C16.2009 8.84641 16.2057 8.85121 16.2105 8.86081C16.2345 8.88481 16.2489 8.91361 16.2633 8.94241L16.2777 8.97121C16.2921 9.00961 16.3017 9.04801 16.3065 9.09121Z"
              fill="#FBFBFB"
            />
          </svg>
        </div>
        <p className=" ">Stipend Form</p>
      </div>
    </div>
  );
};

export default OthersDropdown;
