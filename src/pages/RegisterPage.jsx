import { useFormik } from "formik";
import SmartInput from "../components/UI/SmartInput";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { baseBeUrl } from "../helper";

export default function RegisterPage() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().min(3).required(),
      password: Yup.string().min(5).max(30).required(),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));

      sendAxiosData({
        email: values.email,
        password: values.password,
      });
    },
  });

  function sendAxiosData(data) {
    axios
      .post(`${baseBeUrl}/auth/register`, data)
      .then((resp) => {
        console.log("resp", resp);
        toast.success("You have been registered");
      })
      .catch((error) => {
        console.warn(error);

        const klaida = error.response.data.error;
        toast.error(klaida);
      });
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl ">RegisterPage</h1>
      <form onSubmit={formik.handleSubmit} className="mt-4" noValidate>
        <div className="mb-4">
          <SmartInput
            id="email"
            formik={formik}
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <SmartInput
            id="password"
            formik={formik}
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-4">
          <SmartInput
            id="passwordConfirm"
            formik={formik}
            type="password"
            placeholder="Repeat your password"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
