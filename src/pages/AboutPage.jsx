import { AssetImage } from "../components/AssetImage.jsx";

const team = [
  {
    name: "Tom Cruise",
    role: "Founder & Chairman",
    img: "/images/team/tom-cruise.jpg",
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    img: "/images/team/emma-watson.jpg",
  },
  {
    name: "Will Smith",
    role: "Product Designer",
    img: "/images/team/will-smith.jpg",
  },
];

const stats = [
  ["10.5k", "Sellers active on our site", false],
  ["33k", "Monthly Product Sale", true],
  ["45.5k", "Customer active on our site", false],
  ["25k", "Annual gross sale on our site", false],
];

export function AboutPage() {
  return (
    <div className="container-px py-16">
      <p className="text-sm text-gray-400 mb-10">Home / About</p>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl font-semibold mb-6">Our Story</h1>
          <p className="text-gray-600 mb-4">
            Launched in 2015, Exclusive is South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 million
            customers across the region.
          </p>
          <p className="text-gray-600">
            Exclusive has more than 1 Million products to offer, growing very
            fast. Exclusive offers a diverse assortment in categories ranging
            from consumer electronics to fashion.
          </p>
        </div>
        <AssetImage
          src="/images/about/our-story.jpg"
          alt="Our Story"
          fallbackEmoji="🛍️"
          className="rounded-md h-80 md:h-[420px] bg-pink-200"
          imgClassName="rounded-md h-80 md:h-[420px] w-full"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {stats.map(([num, label, highlighted]) => (
          <div
            key={label}
            className={`rounded-md text-center py-8 ${
              highlighted ? "bg-brand-red text-white" : "border"
            }`}
          >
            <div
              className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                highlighted ? "bg-white/20" : "bg-gray-100"
              }`}
            >
              🏪
            </div>
            <p className="text-2xl font-semibold">{num}</p>
            <p
              className={`text-sm mt-2 ${
                highlighted ? "text-white/90" : "text-gray-500"
              }`}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {team.map((member) => (
          <div key={member.name} className="text-center">
            <AssetImage
              src={member.img}
              alt={member.name}
              fallbackEmoji="🧑‍💼"
              className="bg-gray-100 rounded-md h-72 w-full mb-4"
              imgClassName="rounded-md h-72 w-full"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{member.role}</p>
            <div className="flex justify-center gap-4 text-lg"></div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mb-20">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === 2 ? "bg-brand-red" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pb-6">
        {[
          [
            "🚚",
            "FREE AND FAST DELIVERY",
            "Free delivery for all orders over $140",
          ],
          ["🎧", "24/7 CUSTOMER SERVICE", "Friendly 24/7 customer support"],
          ["🛡️", "MONEY BACK GUARANTEE", "We reurn money within 30 days"],
        ].map(([icon, title, desc]) => (
          <div key={title} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl mb-4">
              {icon}
            </div>
            <h4 className="font-semibold mb-1 tracking-wide">{title}</h4>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
