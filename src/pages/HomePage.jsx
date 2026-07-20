import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllProducts } from "../features/products/productsSlice.js";
import { ProductCard } from "../components/ProductCard.jsx";
import { CategorySidebar } from "../components/CategorySidebar.jsx";
import { AssetImage } from "../components/AssetImage.jsx";
import { useCountdown, pad } from "../hooks/useCountdown.js";
import { iconCategories } from "../data/mockProducts.js";
import { ICONS } from "../constants/icons.js";

const FLASH_SALE_END = new Date(
  Date.now() + (3 * 24 + 23) * 60 * 60 * 1000 + 19 * 60 * 1000 + 56 * 1000
);
const MUSIC_PROMO_END = new Date(
  Date.now() + (23 * 24 + 5) * 60 * 60 * 1000 + 59 * 60 * 1000 + 35 * 1000
);

const heroSlides = [
  {
    eyebrow: "iPhone 14 Series",
    title: "Up to 10% off Voucher",
    cta: "Shop Now",
    img: "/images/hero/iphone-14.png",
    emoji: "📱",
  },
];

function CountdownBlock({ label, value }) {
  return (
    <div className="text-center">
      <p className="text-[10px] text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-semibold">{pad(value)}</p>
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <p className="text-brand-red font-medium mb-2 flex items-center gap-2">
      <span className="w-3 h-6 bg-brand-red rounded-sm inline-block" />{" "}
      {eyebrow}
    </p>
  );
}

export function HomePage() {
  const products = useSelector(selectAllProducts);
  const flashSale = products.filter((p) => p.discountPct);
  const bestSelling = products.slice(4, 8);
  const explore = products.slice(8, 16);
  const [activeSlide] = useState(0);

  const flashCountdown = useCountdown(FLASH_SALE_END);
  const musicCountdown = useCountdown(MUSIC_PROMO_END);

  const slide = heroSlides[activeSlide];

  return (
    <div className="container-px py-10">
      <div className="flex gap-10 mb-10">
        <CategorySidebar />

        <div className="flex-1 min-w-0">
          <div className="bg-black text-white rounded-md px-8 md:px-16 py-10 md:py-0 md:h-[350px] flex items-center justify-between mb-4">
            <div>
              <p className="text-sm mb-4 flex items-center gap-2">
                <AssetImage
                  src={ICONS.appleLogo}
                  alt=""
                  fallbackEmoji="🍎"
                  fallbackTextClassName="text-sm"
                  className="w-4 h-4"
                  imgClassName="w-8 h-8"
                />
                {slide.eyebrow}
              </p>
              <h1 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight">
                {slide.title}
              </h1>
              <Link to="/product/1" className="inline-flex items-center gap-2">
                <span className="underline">{slide.cta}</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
            <AssetImage
              src={slide.img}
              alt={slide.eyebrow}
              fallbackEmoji={slide.emoji}
              className="hidden md:flex w-64 h-64 shrink-0"
              imgClassName="w-64 h-64"
            />
          </div>
        </div>
      </div>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <SectionHeading eyebrow="Today's" />
            <div className="flex items-end gap-10">
              <h2 className="text-3xl font-semibold">Flash Sales</h2>
              <div className="flex items-center gap-4 pb-1">
                <CountdownBlock label="Days" value={flashCountdown.days} />
                <span className="text-brand-red text-xl pb-3">:</span>
                <CountdownBlock label="Hours" value={flashCountdown.hours} />
                <span className="text-brand-red text-xl pb-3">:</span>
                <CountdownBlock
                  label="Minutes"
                  value={flashCountdown.minutes}
                />
                <span className="text-brand-red text-xl pb-3">:</span>
                <CountdownBlock
                  label="Seconds"
                  value={flashCountdown.seconds}
                />
              </div>
            </div>
          </div>
          <div className="hidden sm:flex gap-2">
            <button className="w-9 h-9 rounded-full border flex items-center justify-center">
              ←
            </button>
            <button className="w-9 h-9 rounded-full border flex items-center justify-center">
              →
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
          {flashSale.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/"
            className="bg-brand-red text-white rounded px-10 py-3 inline-block"
          >
            View All Products
          </Link>
        </div>
      </section>

      <hr className="mb-16" />

      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <SectionHeading eyebrow="Categories" />
            <h2 className="text-3xl font-semibold">Browse By Category</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button className="w-9 h-9 rounded-full border flex items-center justify-center">
              ←
            </button>
            <button className="w-9 h-9 rounded-full border flex items-center justify-center">
              →
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {iconCategories.map((c) => (
            <div
              key={c.name}
              className="border rounded-md py-6 flex flex-col items-center gap-3 hover:bg-brand-red hover:text-white cursor-pointer transition group"
            >
              <AssetImage
                src={c.img}
                alt={c.name}
                fallbackEmoji={c.icon}
                className="w-10 h-10"
                imgClassName="w-10 h-10 group-hover:brightness-0 group-hover:invert"
              />
              <p className="text-sm">{c.name}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="mb-16" />

      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <SectionHeading eyebrow="This Month" />
            <h2 className="text-3xl font-semibold">Best Selling Products</h2>
          </div>
          <Link to="/" className="bg-brand-red text-white rounded px-8 py-3">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {bestSelling.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mb-16 bg-black text-white rounded-md px-8 md:px-16 py-10 md:py-16 flex items-center justify-between">
        <div>
          <p className="text-green-400 text-sm mb-3">Categories</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
            Enhance Your
            <br />
            Music Experience
          </h2>
          <div className="flex gap-3 mb-6">
            <CountdownBlock label="Hours" value={musicCountdown.hours} />
            <CountdownBlock label="Days" value={musicCountdown.days} />
            <CountdownBlock label="Minutes" value={musicCountdown.minutes} />
            <CountdownBlock label="Seconds" value={musicCountdown.seconds} />
          </div>
          <Link
            to="/product/2"
            className="bg-green-500 text-black rounded px-8 py-3 inline-block font-medium"
          >
            Buy Now!
          </Link>
        </div>
        <AssetImage
          src="/images/promo/jbl-speaker.png"
          alt="JBL Boombox speaker"
          fallbackEmoji="🔊"
          className="hidden md:flex w-64 h-64 shrink-0"
          imgClassName="w-64 h-64"
        />
      </section>

      <section className="mb-16">
        <div className="mb-8">
          <SectionHeading eyebrow="Our Products" />
          <h2 className="text-3xl font-semibold">Explore Our Products</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {explore.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/"
            className="bg-brand-red text-white rounded px-10 py-3 inline-block"
          >
            View All Products
          </Link>
        </div>
      </section>

      <hr className="mb-16" />

      <section className="mb-16">
        <div className="mb-8">
          <SectionHeading eyebrow="Featured" />
          <h2 className="text-3xl font-semibold">New Arrival</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 h-auto md:h-[600px]">
          <div className="relative rounded-md overflow-hidden bg-gray-900 text-white h-72 md:h-full">
            <AssetImage
              src="/images/new-arrival/ps5.jpg"
              alt="PlayStation 5"
              fallbackEmoji="🎮"
              className="absolute inset-0 w-full h-full"
              imgClassName="w-full h-full opacity-70"
            />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-semibold mb-2">PlayStation 5</h3>
              <p className="text-sm mb-3 max-w-xs">
                Black and White version of the PS5 coming out on sale.
              </p>
              <Link to="/" className="underline text-sm">
                Shop Now
              </Link>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-4 h-72 md:h-full">
            <div className="relative rounded-md overflow-hidden bg-gray-800 text-white">
              <AssetImage
                src="/images/new-arrival/womens-collection.jpg"
                alt="Women's Collection"
                fallbackEmoji="👗"
                className="absolute inset-0 w-full h-full"
                imgClassName="w-full h-full opacity-70"
              />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-lg font-semibold mb-1">
                  Women's Collections
                </h3>
                <p className="text-xs mb-2 max-w-xs">
                  Featured woman collections that give you another vibe.
                </p>
                <Link to="/" className="underline text-sm">
                  Shop Now
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-md overflow-hidden bg-gray-800 text-white">
                <AssetImage
                  src="/images/new-arrival/speakers.jpg"
                  alt="Speakers"
                  fallbackEmoji="🔊"
                  className="absolute inset-0 w-full h-full"
                  imgClassName="w-full h-full opacity-70"
                />
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-sm font-semibold">Speakers</h4>
                  <Link to="/" className="underline text-xs">
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="relative rounded-md overflow-hidden bg-gray-800 text-white">
                <AssetImage
                  src="/images/new-arrival/perfume.jpg"
                  alt="Perfume"
                  fallbackEmoji="🧴"
                  className="absolute inset-0 w-full h-full"
                  imgClassName="w-full h-full opacity-70"
                />
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-sm font-semibold">Perfume</h4>
                  <Link to="/" className="underline text-xs">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-10">
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
