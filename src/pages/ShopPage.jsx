import BuyItemButton from "../components/UI/BuyItemButton";
import { baseBeUrl } from "../helper";
import useApiData from "../hooks/useApiData";
import { useAuthContext } from "../store/AuthCtxProvider";

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

  const { isUserLoggedIn, userId } = useAuthContext();
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
            <p>rating: {item.rating}</p>
            <p>stock: {item.stock}</p>
            <p>cat_id: {item.cat_id}</p>
            {isUserLoggedIn && (
              <BuyItemButton itemId={item.id} customerId={userId} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
