export default function ProductStarRating({ rating, onRating }) {
  const stars = [];
  console.log("item.user_rating ===", rating);

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span
          key={i}
          onClick={() => onRating(i)}
          style={{ cursor: "pointer", color: "orange" }}
        >
          ★
        </span>
      );
    } else {
      stars.push(
        <span
          key={i}
          onClick={() => onRating(i)}
          style={{ cursor: "pointer", color: "grey" }}
        >
          ★
        </span>
      );
    }
  }

  return <div>{stars}</div>;
}
