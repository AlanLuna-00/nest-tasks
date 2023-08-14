import React, { useEffect, useState } from "react";
import { Category } from "./Filter";
import axiosInstance from "@/shared/axiosInstance";
import { Note } from "@/redux/notesSlice";

interface AddCategoriesModalProps {
  isOpen: boolean;
  note: Note;
  categories: Category[];
  selectedCategories: Category[];
  onClose: () => void;
  onAddCategories: (categories: Category[]) => void;
}

const AddCategoriesModal: React.FC<AddCategoriesModalProps> = ({
  isOpen,
  note,
  categories,
  selectedCategories,
  onClose,
  onAddCategories,
}) => {
  const [selected, setSelected] = useState<Category[]>(selectedCategories);

  const handleSelectCategory = (category: Category) => {
    setSelected((prevSelected) => [...prevSelected, category]);
  };

  const handleRemoveCategory = (category: Category) => {
    setSelected((prevSelected) =>
      prevSelected.filter((c) => c.id !== category.id)
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axiosInstance.put(`notes/add-cat/${note.id}`, {
      categoriesIds: selected.map((c) => c.id),
    });
    console.log(res.data);
    onAddCategories(selected);
    onClose();
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      }  top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center`}
    >
      <div className="bg-white p-8 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add Categories
        </h2>
        <form onSubmit={handleSubmit}>
          <ul className="space-y-2 mb-4">
            {categories.map((category) => (
              <li key={category.id}>
                <label className="flex items-center text-gray-800">
                  <input
                    type="checkbox"
                    checked={selected.some((c) => c.id === category.id)}
                    onChange={() =>
                      selected.some((c) => c.id === category.id)
                        ? handleRemoveCategory(category)
                        : handleSelectCategory(category)
                    }
                    className="mr-2"
                  />
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoriesModal;
