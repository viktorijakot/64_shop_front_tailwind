import { Link, useNavigate, useParams } from "react-router-dom";
import useApiData from "../../hooks/useApiData";
import { baseBeUrl } from "../../helper";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../store/AuthCtxProvider";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Select from "react-select";
import SmartInput from "../../components/UI/SmartInput";

export default function ItemEditPage() {
  const { id } = useParams();

  const [item, setItem] = useApiData(`${baseBeUrl}items/${id}`);

  const [categoriesOptions, setCategoriesOptions] = useState([""]);

  const { token } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    const getOptionData = async () => {
      const optionsArray = [];
      await axios
        .get(`${baseBeUrl}categories`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          let result = response.data;
          result.map((category) => {
            return optionsArray.push({
              value: category.id,
              label: category.name,
            });
          });
          setCategoriesOptions(optionsArray);
        });
    };

    getOptionData();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: item.title || "",
      description: item.description || "",
      cat_id: item.cat_id || "",
      price: item.price || "",
      stock: item.stock || "",
      rating: item.rating || "",
      img_url: item.img_url || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().min(3).max(255).required(),
      description: Yup.string().optional(),
      cat_id: Yup.number().min(1).required(),
      price: Yup.string().required(),
      stock: Yup.number().required(),
      rating: Yup.number().optional(),
      img_url: Yup.string().optional(),
    }),
    onSubmit: (values) => {
      sendAxiosData(values);
    },
  });

  function sendAxiosData(data) {
    axios
      .put(`${baseBeUrl}items/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(
          response?.message || "Item has been successfully updated!"
        );
        navigate("/items", { replace: true });
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center my-10">Prekės redagavimas</h1>
      <form onSubmit={formik.handleSubmit} className="mt-4" noValidate>
        <div className="mb-4">
          <label htmlFor="cat_id" className="w-full mt-5">
            Category
          </label>
          <Select
            className="w-full rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            name="cat_id"
            id="cat_id"
            options={categoriesOptions}
            value={
              categoriesOptions
                ? categoriesOptions.find(
                    (option) => option.value === formik.values.cat_id
                  )
                : ""
            }
            defaultValue={formik.values.cat_id}
            placeholder="Select Category"
            onBlur={formik.handleBlur}
            onChange={(option) => formik.setFieldValue("cat_id", +option.value)}
          />
          {formik.touched["cat_id"] && formik.errors["cat_id"] && (
            <p className="text-red-500 ">{formik.errors["cat_id"]}</p>
          )}
          <SmartInput
            id="title"
            formik={formik}
            type="text"
            placeholder="Enter item title"
          />
          <SmartInput
            id="description"
            formik={formik}
            type="textarea"
            placeholder="Enter item description"
          />
          <SmartInput
            id="price"
            formik={formik}
            type="text"
            placeholder="Enter item description"
          />
          <SmartInput
            id="stock"
            formik={formik}
            type="text"
            placeholder="Enter item stock"
          />
          <SmartInput
            id="rating"
            formik={formik}
            type="text"
            placeholder="Enter item rating"
          />
          <SmartInput
            id="img_url"
            formik={formik}
            type="text"
            placeholder="Enter item stock"
          />
        </div>
        <div className="flex items-center justify-center mt-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Redaguoti
          </button>
          <Link
            to="/categories"
            className="bg-gray-500 hover:bg-gray-400 ml-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Grįžti
          </Link>
        </div>
      </form>
    </div>
  );
}
