import React, { useState, useEffect } from "react";

const EventForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: initialData.id || "",
    name: initialData.name || "",
    startDate: initialData.startDate || "",
    endDate: initialData.endDate || "",
    description: initialData.description || "",
    image: initialData.image || null,
    level: initialData.level || "Easy",
  });
  const [errors, setErrors] = useState({});
  //   console.log("initialData in form:", initialData);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setFormData({ ...formData, image: imageUrl });
        localStorage.setItem("uploadedImage", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Challenge Name is required";
    if (!formData.startDate) newErrors.startDate = "Start Date is required";
    if (!formData.endDate) newErrors.endDate = "End Date is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const formattedStartDate = new Date(formData.startDate).toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        }
      );
      const formattedEndDate = new Date(formData.endDate).toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        }
      );

      onSubmit({
        ...formData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col justify-start items-start text-left "
    >
      <div className="mb-4 w-[500px]">
        <label className="block text-gray-700 font-bold mb-2">
          Challenge Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          placeholder="Enter challenge name"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Start Date</label>
        <input
          type="datetime-local"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className={`w-full p-2 border ${
            errors.startDate ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm">{errors.startDate}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">End Date</label>
        <input
          type="datetime-local"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className={`w-full p-2 border ${
            errors.endDate ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
        {errors.endDate && (
          <p className="text-red-500 text-sm">{errors.endDate}</p>
        )}
      </div>

      <div className="mb-4 w-[500px]">
        <label className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`w-full p-2 border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          placeholder="Enter challenge description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>

      <div className="mb-4 w-[500px]">
        <label className="block text-gray-700 font-bold mb-2">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-2"
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Selected"
            className="h-24 w-24 object-cover mb-2"
          />
        )}
      </div>

      <div className="mb-4 w-[500px]">
        <label className="block text-gray-700 font-bold mb-2">Level Type</label>
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
        >
          {initialData ? "Update Challenge" : "Create Challenge"}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
