import { useState } from "react";
import { useNavigate } from "react-router-dom";
import businessService from "../services/businessService";

const AddBusiness = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    address: "",
    phone: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await businessService.create(form);

      if (response.success && response.data) {
        navigate(`/business/${response.data._id}`);
      } else {
        setError(response.message || "Unable to submit business. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Unable to submit business. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add Business</h1>

<<<<<<< HEAD
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
=======
      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
>>>>>>> 34707b7 (improved some styling)
        />
        <input
          name="category"
          placeholder="Category"
<<<<<<< HEAD
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
=======
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
>>>>>>> 34707b7 (improved some styling)
        />
        <input
          name="address"
          placeholder="Address"
<<<<<<< HEAD
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
=======
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
>>>>>>> 34707b7 (improved some styling)
        />
        <input
          name="phone"
          placeholder="Phone"
<<<<<<< HEAD
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
        />

        <textarea
          name="description"
          placeholder="Description"
=======
          value={form.phone}
>>>>>>> 34707b7 (improved some styling)
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
        />

<<<<<<< HEAD
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Business
=======
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Add Business"}
>>>>>>> 34707b7 (improved some styling)
        </button>
      </form>
    </div>
  );
};

export default AddBusiness;
