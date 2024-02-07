import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { baseBeUrl } from "../../helper";
import toast from "react-hot-toast";
import axios from "axios";
import SmartInput from "../../components/UI/SmartInput";
import { useAuthContext } from "../../store/AuthCtxProvider";

function CategoryCreate() {
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(128).required(),
    }),
    onSubmit: (values) => {
      sendAxiosData(values);
    },
  });

  function sendAxiosData(data) {
    axios
      .post(`${baseBeUrl}categories`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(
          response?.message || "Category has been successfully created!"
        );
        navigate("/categories", { replace: true });
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center my-10">Kategorijos sukūrimas</h1>
      <form onSubmit={formik.handleSubmit} className="mt-4" noValidate>
        <div className="mb-4">
          <SmartInput
            id="name"
            formik={formik}
            type="text"
            placeholder="Enter category name"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sukurti
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryCreate;
