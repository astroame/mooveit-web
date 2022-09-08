import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
// import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

const FormPassword = ({ name, register, errors, errorMessage }) => {
  const [inputType, setInputType] = useState("password");
  const router = useRouter();
  // const pathname = router.pathname;

  return (
    <div className="flex flex-col mb-4 w-full">
      <label className="text-base text-gray-800 mb-2 inline-block text-left">Password</label>
      <div className="relative">
        <input
          className={`${
            errors[name] ? "border-red-600" : "input-primary"
          } text-black input input-bordered focus:outline-offset-0 focus:outline-1 disabled:bg-[#ececec] disabled:text-black w-full`}
          type={inputType}
          {...register(name, { required: true })}
        />

        {inputType === "password" && (
          <EyeIcon
            className="w-6 h-6 absolute text-primary cursor-pointer right-3 top-[25%]"
            onClick={() => setInputType("text")}
          />
        )}
        {inputType === "text" && (
          <EyeOffIcon
            className="w-6 h-6 absolute text-primary cursor-pointer right-3 top-[25%]"
            onClick={() => setInputType("password")}
          />
        )}
      </div>
      {errors[name] && <span className="text-red-600 text-sm text-left">{errorMessage}</span>}
      {/* {pathname !== "/register" && !pathname.includes("/reset-password") && (
        <Link href="/forgot-password">
          <span className="label-text-alt text-accent text-sm text-right cursor-pointer">Forgot Password?</span>
        </Link>
      )} */}
    </div>
  );
};

export default FormPassword;
