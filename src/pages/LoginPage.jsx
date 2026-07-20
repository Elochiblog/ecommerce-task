import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useForm, rules } from '../hooks/useForm.js';
import { AssetImage } from '../components/AssetImage.jsx';

const validationRules = {
  email: rules.compose(rules.required('Email'), rules.email()),
  password: rules.required('Password'),
};

export function LoginPage() {
  const { logIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/';

  const { values, errors, submitError, setSubmitError, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    validationRules
  );

  const onValid = async (vals) => {
    const result = await logIn(vals);
    if (result.ok) {
      navigate(redirectTo, { replace: true });
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

      <form onSubmit={handleSubmit(onValid)} className="max-w-sm mx-auto w-full">
        <h1 className="text-3xl font-semibold mb-2">Log in to Exclusive</h1>
        <p className="text-gray-500 mb-8">Enter your details below</p>

        {submitError && <p className="text-red-600 text-sm mb-4">{submitError}</p>}

        <div className="mb-6">
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email or Phone Number"
            className="w-full border-b border-gray-300 outline-none py-2"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
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
          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-red text-white rounded px-10 py-3 font-medium disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Log In'}
          </button>
          <Link to="#" className="text-brand-red text-sm">Forget Password?</Link>
        </div>

        <p className="mt-8 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="underline font-medium">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
