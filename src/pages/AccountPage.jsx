import { useAuth } from "../hooks/useAuth.js";
import { useForm, rules } from "../hooks/useForm.js";
import { withAuth } from "../hocs/withAuth.jsx";

const validationRules = {
  firstName: rules.required("First Name"),
  lastName: rules.required("Last Name"),
  email: rules.compose(rules.required("Email"), rules.email()),
  newPassword: (value) => (value ? rules.password()(value) : undefined),
  confirmPassword: rules.matchesField("Confirm New Password", "newPassword"),
};

const sidebarSections = [
  {
    heading: "Manage My Account",
    items: [
      { label: "My Profile", active: true },
      { label: "Address Book" },
      { label: "My Payment Options" },
    ],
  },
  {
    heading: "My Orders",
    items: [{ label: "My Returns" }, { label: "My Cancellations" }],
  },
  {
    heading: "My WishList",
    items: [],
  },
];

function AccountPage() {
  const { user } = useAuth();
  const [firstName, ...rest] = (user?.displayName || "").split(" ");
  const lastName = rest.join(" ");

  const { values, errors, handleChange, handleSubmit, submitting } = useForm(
    {
      firstName: firstName || "",
      lastName: lastName || "",
      email: user?.email || "",
      address: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationRules
  );

  const onValid = async () => {
    alert(
      "Profile changes saved (demo only — wire up updateProfile()/updatePassword() to persist)."
    );
  };

  return (
    <div className="container-px py-10">
      <div className="flex items-center justify-between mb-10 text-sm">
        <p className="text-gray-400">
          Home / <span className="text-black">My Account</span>
        </p>
        <p>
          Welcome!{" "}
          <span className="text-brand-red">
            {[firstName, lastName].filter(Boolean).join(" ") || user?.email}
          </span>
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-10">
        <aside>
          {sidebarSections.map((section) => (
            <div key={section.heading} className="mb-6">
              <h3 className="font-medium mb-4">{section.heading}</h3>
              {section.items.length > 0 && (
                <ul className="text-sm text-gray-500 space-y-2">
                  {section.items.map((item) => (
                    <li
                      key={item.label}
                      className={item.active ? "text-brand-red" : ""}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </aside>

        <form
          onSubmit={handleSubmit(onValid)}
          className="md:col-span-3 border rounded-md p-8 max-w-2xl"
        >
          <h2 className="text-brand-red font-medium mb-6">Edit Your Profile</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm text-gray-600">First Name</label>
              <input
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded px-3 py-3 mt-1"
              />
              {errors.firstName && (
                <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600">Last Name</label>
              <input
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded px-3 py-3 mt-1"
              />
              {errors.lastName && (
                <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                name="email"
                value={values.email}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded px-3 py-3 mt-1"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600">Address</label>
              <input
                name="address"
                value={values.address}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded px-3 py-3 mt-1"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-600 block mb-4">
              Password Changes
            </label>
            <div className="space-y-4">
              <input
                type="password"
                name="currentPassword"
                value={values.currentPassword}
                onChange={handleChange}
                placeholder="Current Password"
                className="w-full bg-gray-100 rounded px-3 py-3"
              />
              <div>
                <input
                  type="password"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="w-full bg-gray-100 rounded px-3 py-3"
                />
                {errors.newPassword && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.newPassword}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                  className="w-full bg-gray-100 rounded px-3 py-3"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center gap-6">
            <button type="button" className="text-sm">
              Cancel
            </button>
            <button
              disabled={submitting}
              className="bg-brand-red text-white rounded px-6 py-3"
            >
              {submitting ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withAuth(AccountPage);
