import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "../firebase/firebase";
import swal from "sweetalert";
import { addDoc } from "firebase/firestore";
import { usersRef } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const auth = getAuth(app);
const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        },
      }
    );
  };

  const requestOtp = () => {
    setLoading(true);
    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setOtpSent(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadData = async () => {
    try {
      const salt= bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(usersRef, {
        name: form.name,
        password: hash,
        mobile: form.mobile
      });
    } catch (error) {
      console.log(error);
    }

  };

  const verifyOTP = () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Successfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setLoading(false);
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-8">
      {otpSent ? (
        <>
          <h1 className="text-xl font-bold">Sign Up</h1>
          <div class="p-2 w-full md:w-1/2">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">
                OTP
              </label>
              <input
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <button
            onClick={verifyOTP}
            className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg mt-4"
          >
            {loading ? <TailSpin height={25} color="white" /> : "Submit OTP"}
          </button>
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold">Sign Up</h1>
          <div class="p-2 w-full md:w-1/2">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-full md:w-1/2">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">
                Mobile No.
              </label>
              <input
                type="number"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-full md:w-1/2">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">
                Password
              </label>
              <input
              type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <button
            onClick={requestOtp}
            class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg mt-4"
          >
            {loading ? <TailSpin height={25} color="white" /> : "Request OTP"}
          </button>
        </>
      )}
      <div>
        <p>
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="text-blue-500">Login</span>
          </Link>
        </p>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Signup;
