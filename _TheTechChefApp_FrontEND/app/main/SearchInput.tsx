import { SyntheticEvent, useRef } from "react";
import axios from "axios";

const SearchInput = (props: { setImageData: (data: string[]) => void }) => {
  const timeout = useRef(0);

  const changeHandler = (e: SyntheticEvent) => {
    clearTimeout(timeout.current);

    setTimeout(async () => {
      const el = e.target as HTMLInputElement;
      if (el.value.length > 0) {
        const res = await axios.get("https://pixabay.com/api/", {
          params: {
            key: "36351324-ffabe46ef8620e8fd355f92da",
            q: encodeURIComponent(el.value),
            image_type: "photo",
            per_page: 18,
            orientation: "horizontal",
          },
        });
        props.setImageData(res.data.hits.map((it: any) => it.webformatURL));
      }
    }, 600);
  };

  return (
    <input
      className="rounded block my-2 py-1 bg-white w-64 text-lg text-center text-black"
      type="text"
      autoFocus
      placeholder="TheTCPicsGenerator 1.0"
      onChange={changeHandler}
    />
  );
};

export default SearchInput;
