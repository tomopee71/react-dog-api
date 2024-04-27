import React from "react";

// {
//   "message": [
//       "https://images.dog.ceo/breeds/lhasa/n02098413_16009.jpg",
//       "https://images.dog.ceo/breeds/appenzeller/n02107908_4092.jpg",
//       "https://images.dog.ceo/breeds/dalmatian/cooper2.jpg"
//   ],
//   "status": "success"
// }

const HelloFetchImages = ({ defaultImageNums }) => {
  const [imageNums, setImageNums] = React.useState(defaultImageNums);
  const [imageUrls, setImageUrls] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // データ取得とステートの保持
  const fetchData = async () => {
    if (!imageNums || !(imageNums >= 1 && imageNums <= 50)) {
      alert("please select 1...50 number");
      return;
    }
    setLoading(true);
    try {
      const url = `https://dog.ceo/api/breeds/image/random/${imageNums}`;
      const res = await fetch(url);
      const data = await res.json();
      setImageUrls(data.message);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    if (e.target.value) {
      setImageNums(parseInt(e.target.value));
    } else {
      setImageNums("");
    }
  };

  // 副作用フック（マウント時）
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading
        ? "loading...."
        : imageUrls.map((x) => (
            <img key={x} src={x} alt="" style={{ width: 100, height: 100 }} />
          ))}
      <div>
        <input
          type="number"
          value={imageNums}
          onChange={handleChange}
          max={50}
          min={1}
        />
        <button onClick={fetchData}>fetch</button>
        <button onClick={() => setImageUrls([])}>clear</button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <HelloFetchImages defaultImageNums={20} />
    </div>
  );
}
