import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/AuthCtxProvider";
import axios from "axios";
import { baseBeUrl } from "../../helper";
import toast from "react-hot-toast";
import { useState } from "react";

export default function BuyItemButton({ itemId, customerId, itemStock }) {
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const [quantity, setQuantity] = useState(1);

  const [max, setMax] = useState(itemStock);

  // get user from Context api
  const buyItem = async () => {
    if (quantity > max) {
      toast.error("Item stock is too low!");
      return;
    }
    sendAxiosData({
      item_id: itemId,
      customer_id: customerId,
      quantity: parseInt(quantity),
    });
  };

  function sendAxiosData(data) {
    axios
      .post(`${baseBeUrl}orders`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(response?.msg || "Order was created successfully!");
        navigate("/orders", { replace: true });
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }

  // get item id from route params
  return (
    <div>
      <input
        className="px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mr-3"
        type="number"
        min="1"
        max="99"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button
        onClick={buyItem}
        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Buy Item
      </button>
    </div>
  );
}
