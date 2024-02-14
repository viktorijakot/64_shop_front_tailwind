import axios from "axios";
import { baseBeUrl, dateTimeOptions } from "../../helper";
import useApiData from "../../hooks/useApiData";
import { useAuthContext } from "../../store/AuthCtxProvider";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

export default function OrderListPage() {
  const [orders, setOrders] = useApiData(`${baseBeUrl}orders`);
  console.log("orders ===", orders);
  const { isUserAdmin, token } = useAuthContext();

  function deleteOrder(orderId) {
    axios
      .delete(`${baseBeUrl}orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(
          response?.message || `Order ID: ${orderId} successfully deleted!`
        );
        const list = orders.filter((order) => order.id !== orderId);
        setOrders(list);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center my-10">Užsakymų sąrašas</h1>
      <div className="mt-5">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-500 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Pirkėjas</th>
              <th className="px-4 py-2">Suma</th>
              <th className="px-4 py-2">Sukūrimo data</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="bg-gray-100">
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.customer}</td>
                <td className="border px-4 py-2">{order.total}</td>
                <td className="border px-4 py-2">
                  {new Date(order.created_at).toLocaleString(
                    "lt-LT",
                    dateTimeOptions
                  )}
                </td>
                <td className="border px-4 py-2">
                  <NavLink
                    to={`/orders/${order.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Peržiūrėti
                  </NavLink>
                  {isUserAdmin && (
                    <button
                      className="bg-red-500 hover:bg-red-400 text-white font-bold ml-2 py-2 px-4 rounded"
                      onClick={() => deleteOrder(order.id)}
                    >
                      Ištrinti
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
