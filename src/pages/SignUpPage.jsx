import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useForm, rules } from "../hooks/useForm.js";
import { AssetImage } from "../components/AssetImage.jsx";

const validationRules = {
  name: rules.required("Name"),
  email: rules.compose(rules.required("Email"), rules.email()),
  password: rules.compose(rules.required("Password"), rules.password()),
};

export function SignUpPage() {
  const { signUp, loading } = useAuth();
  const navigate = useNavigate();
  const {
    values,
    errors,
    submitError,
    setSubmitError,
    handleChange,
    handleSubmit,
  } = useForm({ name: "", email: "", password: "" }, validationRules);

  const onValid = async (vals) => {
    const result = await signUp(vals);
    if (result.ok) {
      navigate("/login");
    } else {
      setSubmitError(result.error);
    }
  };

  return (
    <div className="container-px grid md:grid-cols-2 gap-10 py-16 items-center">
      <AssetImage
        src="/images/auth/auth-hero.png"
        alt="Shopping cart and phone"
        fallbackEmoji="🛍️"
        className="hidden md:flex bg-sky-100 rounded-md h-[560px]"
        imgClassName="rounded-md h-[560px] w-full"
      />

      <form
        onSubmit={handleSubmit(onValid)}
        className="max-w-sm mx-auto w-full"
      >
        <h1 className="text-3xl font-semibold mb-2">Create an account</h1>
        <p className="text-gray-500 mb-8">Enter your details below</p>

        {submitError && (
          <p className="text-red-600 text-sm mb-4">{submitError}</p>
        )}

        <div className="mb-6">
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border-b border-gray-300 outline-none py-2"
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email or Phone Number"
            className="w-full border-b border-gray-300 outline-none py-2"
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-8">
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border-b border-gray-300 outline-none py-2"
          />
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-red text-white rounded py-3 font-medium disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>

        <button
          type="button"
          className="w-full border border-gray-300 rounded py-3 mt-4 font-medium"
        >
          Sign up with Google
        </button>

        <p className="text-center mt-6 text-sm">
          Already have account?{" "}
          <Link to="/login" className="underline font-medium">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
