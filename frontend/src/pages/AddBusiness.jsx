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
      <h1 className="text-2xl font-semibold mb-4">Add Business</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
        />
        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
        />
        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Business
        </button>
      </form>
    </div>
  );
};

export default AddBusiness;
