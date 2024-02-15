import { useState } from "react";
import BuyItemButton from "../components/UI/BuyItemButton";
import { baseBeUrl } from "../helper";
import useApiData from "../hooks/useApiData";
import { useAuthContext } from "../store/AuthCtxProvider";
import axios from "axios";
import toast from "react-hot-toast";
import ProductStarRating from "../components/UI/ProductStarRating";

const itemsUrl = "http://localhost:3000/api/items";

// const itemsObj = {
//   id: 1,
//   title: "Book about HTML",
//   description: "Very important programing language. ",
//   price: "10.99",
//   rating: 3.5,
//   stock: 50,
//   cat_id: 1,
//   img_url: "https://picsum.photos/id/2/800/600",
// };

export default function ShopPage() {
  // const [itemsArr, setItemsArr] = useApiData(itemsUrl);
  const [itemsArr, setItemsArr] = useApiData(`${baseBeUrl}items`);
  const [itemRatings, setItemRatings] = useState([]);
  const { isUserLoggedIn, userId, token } = useAuthContext();

  const handleRating = (id, rating) => {
    axios
      .post(
        `${baseBeUrl}item-ratings`,
        {
          item_id: id,
          customer_id: userId,
          rating: rating,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        toast.success(
          response?.data.msg || "Item rating was successfully added!"
        );
        //setItemsArr(itemsArr.map(item => item.id === id ? {...item, rating} : item))
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };
  console.log("itemsArr ===", itemsArr);
  return (
    <div className="container bg-slate-300">
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
            <p>
              <span className="font-bold">Įvertinimas:</span>{" "}
              {Math.round(item.average_rating * 100) / 100} ({item.rating_count}
              )
            </p>

            {isUserLoggedIn && (
              <div>
                <ProductStarRating
                  rating={item.average_rating}
                  onRating={(rating) => {
                    handleRating(item.id, rating);
                    console.log("rating ===", rating);
                  }}
                />
              </div>
            )}
            <p>
              <span className="font-bold">Likutis:</span> {item.stock}
            </p>
            <p>
              <span className="font-bold">Kategorija:</span>{" "}
              {item.category_name}
            </p>
            {isUserLoggedIn && item.stock > 0 ? (
              <BuyItemButton
                itemId={item.id}
                customerId={userId}
                itemStock={item.stock}
              />
            ) : (
              <p className="mt-4 text-center">
                <span className="font-bold">OUT OF STOCK</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
