import { setNotes } from "@/redux/notesSlice";
import axiosInstance from "@/shared/axiosInstance";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export interface Category {
  id: string;
  name: string;
}

const Filter = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const notes = useSelector((state: any) => state.notes.notes);
  const user = JSON.parse(localStorage.getItem("userNotes") || "null");
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance.get("/category").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleFilter = async (e: any) => {
    const cat = e.target.value;
    console.log(user.id, cat);
    const res = await axiosInstance.get(
      `/notes/user/${user.id}${cat ? `?filter=${cat}` : ""}`
    );
    console.log("data", res.data);
    dispatch(setNotes(res.data));
  };

  const createCategory = async () => {
    const name = prompt("Enter category name");
    if (name) {
      const res = await axiosInstance.post("/category", {
        name,
      });
      await axiosInstance.get("/category").then((response) => {
        setCategories(response.data);
      });
    }
    axiosInstance.get("/category").then((response) => {
      setCategories(response.data);
    });
  };

  return (
    <>
      <div>
        <label htmlFor="category" className="text-white">
          Select Category:
        </label>
        <select
          id="category"
          onChange={handleFilter}
          className="text-black bg-gray-100"
        >
          <option value="" className="text-black">
            All
          </option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.name}
              style={{ color: "black" }}
            >
              {category.name}
            </option>
          ))}
        </select>
        <br />
        <button
          onClick={createCategory}
          className="text-white px-4 py-2 b-white-400"
        >
          Create Category
        </button>
      </div>
    </>
  );
};

export default Filter;
