import { useState } from "react";

const AddBusiness = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    address: "",
    phone: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Add Business
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2 rounded"/>
        <input name="category" placeholder="Category" onChange={handleChange} className="w-full border p-2 rounded"/>
        <input name="address" placeholder="Address" onChange={handleChange} className="w-full border p-2 rounded"/>
        <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full border p-2 rounded"/>

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Add Business
        </button>
      </form>
    </div>
  );
};

export default AddBusiness;