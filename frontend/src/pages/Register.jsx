import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({});

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
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl mb-4">
        Register
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <input name="name" placeholder="Name" className="w-full border p-2 rounded" onChange={handleChange}/>
        <input name="email" placeholder="Email" className="w-full border p-2 rounded" onChange={handleChange}/>
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" onChange={handleChange}/>

        <button className="bg-black text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;