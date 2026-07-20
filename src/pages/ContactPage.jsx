import { useForm, rules } from "../hooks/useForm.js";

const validationRules = {
  name: rules.required("Name"),
  email: rules.compose(rules.required("Email"), rules.email()),
  phone: rules.required("Phone"),
};

export function ContactPage() {
  const { values, errors, submitting, handleChange, handleSubmit } = useForm(
    { name: "", email: "", phone: "", message: "" },
    validationRules
  );

  const onValid = async () => {
    alert("Message sent! We will get back to you within 24 hours.");
  };

  return (
    <div className="container-px py-16 grid md:grid-cols-3 gap-8">
      <div className="border rounded-md p-6">
        <h3 className="font-semibold mb-4">📞 Call To Us</h3>
        <p className="text-sm text-gray-600 mb-4">
          We are available 24/7, 7 days a week.
        </p>
        <p className="text-sm mb-6">Phone: +8801611112222</p>
        <hr className="mb-6" />
        <h3 className="font-semibold mb-4">✉️ Write To Us</h3>
        <p className="text-sm text-gray-600 mb-2">
          Fill out our form and we will contact you within 24 hours.
        </p>
        <p className="text-sm">Emails: customer@exclusive.com</p>
        <p className="text-sm">Emails: support@exclusive.com</p>
      </div>

      <form
        onSubmit={handleSubmit(onValid)}
        className="md:col-span-2 border rounded-md p-6"
      >
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Your Name *"
              className="w-full bg-gray-100 rounded px-3 py-3"
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Your Email *"
              className="w-full bg-gray-100 rounded px-3 py-3"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="Your Phone *"
              className="w-full bg-gray-100 rounded px-3 py-3"
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={6}
          className="w-full bg-gray-100 rounded px-3 py-3 mb-4"
        />
        <button
          disabled={submitting}
          className="bg-brand-red text-white rounded px-8 py-3 float-right"
        >
          {submitting ? "Sending…" : "Send Message"}
        </button>
      </form>
    </div>
  );
}
