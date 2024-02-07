import { Link } from "react-router-dom";
import useApiData from "../../hooks/useApiData";
import { baseBeUrl } from "../../helper";
import { useAuthContext } from "../../store/AuthCtxProvider";
import axios from "axios";
import toast from "react-hot-toast";

function ItemsListPage() {
  const [itemsArr, setItemsArr] = useApiData(`${baseBeUrl}items`);
  console.log("itemsArr ===", itemsArr);
  const { token } = useAuthContext();

  function deleteItem(itemId) {
    axios
      .delete(`${baseBeUrl}items/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(
          response?.data.msg || `Item ID: ${itemId} successfully deleted!`
        );
        const list = itemsArr.filter((item) => item.id !== itemId);
        setItemsArr(list);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }
  return (
    <div className="container bg-slate-300">
      <div className="float-right">
        <Link
          to="/items/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create new item
        </Link>
      </div>

      <h1 className="text-3xl ">ShopPage</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
        voluptatibus, praesentium libero repellat officiis corporis esse iste
        totam reiciendis voluptatem!
      </p>

      <div className="grid grid-cols-3 gap-4">
        {itemsArr.map((item) => (
          <div key={item.id}>
            <img src={item.img_url} alt={item.title} />
            <h2>title: {item.title}</h2>
            <p>description: {item.description}</p>
            <p>price: {item.price}</p>
            <p>rating: {item.rating}</p>
            <p>stock: {item.stock}</p>
            <p>cat_id: {item.cat_id}</p>
            <Link
              to={`/items/edit/${item.id}`}
              className="bg-gray-400 hover:bg-gray-500 me-2 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </Link>
            <button
              onClick={() => deleteItem(item.id)}
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemsListPage;
