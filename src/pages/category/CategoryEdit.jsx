import { useFormik } from "formik";
import SmartInput from "../../components/UI/SmartInput";
import { useNavigate, useParams } from "react-router-dom";
import { baseBeUrl } from "../../helper";
import useApiData from "../../hooks/useApiData";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../../store/AuthCtxProvider";

function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const [category, setCategory] = useApiData(`${baseBeUrl}categories/${id}`);
  console.log("category ===", category);

  const formik = useFormik({
    initialValues: {
      name: category?.name || "",
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
      .put(`${baseBeUrl}categories/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(
          response?.data.msg || "Category has been successfully updated!"
        );
        console.log("response ===", response);
        navigate("/categories", { replace: true });
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center my-10">
        Edit category: {category.name}
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-4" noValidate>
        <div className="mb-4">
          <SmartInput
            id="name"
            formik={formik}
            type="text"
            placeholder="Change category name"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryEdit;
