import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaSpinner, FaBullhorn, FaEdit } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";

const Advertising = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    images: [],
    title: "",
    description: "",
    opacity: "",
    height: "",
    backgroundImg: "" // corrected spelling
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const dataRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://bakend-wtc.onrender.com/api/v1/banners"
      );
      if (!response.ok) throw new Error("Failed to fetch banners from API");
      const ads = await response.json();
      setData(ads.data || []);
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dataRequest();
  }, []);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? Array.from(files) : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.opacity ||
      !formData.height ||
      !formData.backgroundImg || // corrected field name
      (formData.images.length < 1 && !isEditing)
    ) {
      alert("Please fill out all required fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("opacity", formData.opacity);
    formDataToSend.append("height", formData.height);
    formDataToSend.append("background_image", formData.backgroundImg);

    formData.images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      let response;
      if (isEditing && editingId) {
        response = await fetch(
          `https://bakend-wtc.onrender.com/api/v1/banners/${editingId}`,
          {
            method: "PUT",
            body: formDataToSend,
          }
        );
      } else {
        response = await fetch(
          "https://bakend-wtc.onrender.com/api/v1/banners/create",
          {
            method: "POST",
            body: formDataToSend,
          }
        );
      }

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.data || "Error adding/updating advertisement"
        );
      }

      const updatedBanner = await response.json();
      let updatedData = isEditing
        ? data.map((ad) => (ad._id === editingId ? updatedBanner.data : ad))
        : [...data, updatedBanner.data];

      setData(updatedData);
      document.getElementById("my_modal_advertising").close();
      alert("Banner successfully saved!");
      setFormData({ images: [], title: "", description: "" , opacity: "", height: "", backgroundImg: "" }); // corrected field name
    } catch (error) {
      console.error("Error adding/updating advertisement:", error.message);
      alert(`Failed to save the banner: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://bakend-wtc.onrender.com/api/v1/banners/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting advertisement");
      }
      const updatedData = data.filter((ad) => ad._id !== id);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting advertisement:", error);
    }
  };

  const handleEdit = (ad) => {
    setFormData({
      title: ad.title,
      description: ad.description,
      images: [],
      opacity: ad.opacity,
      height: ad.height,
      backgroundImg: ad.background_image, // corrected field name
    });
    setEditingId(ad._id);
    setIsEditing(true);
    document.getElementById("my_modal_advertising").showModal();
  };

  return (
    <div className="p-5 flex flex-col w-10/15 gap-5 text-base">
      <div className="bg-base-200 p-5 w-full flex justify-between items-center rounded-2xl">
        <h1 className="text-2xl font-bold text-primary flex gap-2">
          <FaBullhorn className="size-9" /> Баннер и Реклама
        </h1>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => {
            setIsEditing(false);
            setFormData({ images: [], title: "", description: "" , opacity: "" , backgroundImg: "", height: "" });
            document.getElementById("my_modal_advertising").showModal();
          }}
        >
          <FaPlus className="mr-2" /> Добавить
        </button>
      </div>

      <dialog id="my_modal_advertising" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              X
            </button>
          </form>
          <form onSubmit={handleFormSubmit}>
            <label className="input input-bordered flex items-center gap-2 mt-10">
              Заголовок
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                className="grow"
                placeholder="Title"
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-5">
              Изображение
              <input
                type="file"
                name="images"
                onChange={handleFormChange}
                className="grow"
                accept="image/*"
                multiple={!isEditing}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-5">
              Описание
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                className="grow"
                placeholder="Description"
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-5">
              Прозрачность заднего фона 
              <input
                type="number"
                name="opacity"
                value={formData.opacity}
                onChange={handleFormChange}
                className="grow"
                placeholder="Прозрачность заднего фона"
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-5">
              Высота рекламного баннера 
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleFormChange}
                className="grow"
                placeholder="Высота рекламного баннера px"
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-5">
              Изображение заднего фона
              <input
                type="text"
                name="backgroundImg" // corrected field name
                value={formData.backgroundImg} // corrected field name
                onChange={handleFormChange}
                className="grow"
                placeholder="Изображение заднего фона"
                required
              />
            </label>
            <button type="submit" className="btn mt-5">
              {isEditing ? "Редактировать баннер" : "Добавить баннер"}
            </button>
          </form>
        </div>
      </dialog>

      <div className="p-5 w-full flex justify-between items-center bg-base-200 rounded-3xl">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Изображение</th>
                <th>Заголовок</th>
                <th>Описание</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    <Loading />
                  </td>
                </tr>
              ) : Array.isArray(data) && data.length > 0 ? (
                data.map((ad) => (
                  <tr key={ad._id}>
                    <td>{ad._id}</td>
                    <td>
                      {ad.images && ad.images.length > 0 ? (
                        <img
                          src={`https://bakend-wtc.onrender.com/${ad.images[0]}`}
                          alt="Banner"
                          className="w-16 h-16 object-cover"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{ad.title}</td>
                    <td>
                      {ad.description.length > 50
                        ? ad.description.slice(0, 50) + "..."
                        : ad.description}
                    </td>
                    <td className="flex items-center justify-center gap-4">
                      <button
                        className="btn btn-outline btn-warning"
                        onClick={() => handleEdit(ad)}
                      >
                        <FaEdit className="mr-2" /> Редактировать
                      </button>
                      <button
                        className="btn btn-outline btn-error"
                        onClick={() => handleDelete(ad._id)}
                      >
                        <FaTrash className="mr-2" /> Удалить
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Нет доступных баннеров
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Advertising;
