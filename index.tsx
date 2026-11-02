import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Minus, Plus, X } from "lucide-react";
import { toast, Toaster } from "sonner";
import { formatUgx, products, WHATSAPP, type Category, type Product } from "@/data/products";

export const Route = createFileRoute("/")({ component: Home });

type CartLine = Product & { quantity: number };
type Filter = "all" | Category;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "perfume", label: "Perfumes" },
  { id: "shoes", label: "Shoes" },
  { id: "bags", label: "Bags" },
];

function Home() {
  const [filter, setFilter] = useState<Filter>("all");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const visible = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (!existing) return [...prev, { ...product, quantity: 1 }];
      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
    toast.success(`${product.name} added to cart`);
  }

  function changeQty(id: number, delta: number) {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  function openCheckout() {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setOrdered(false);
    setCartOpen(false);
    setCheckoutOpen(true);
  }

  function placeOrder() {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error("Please fill in name, phone and address");
      return;
    }
    const lines = cart
      .map((item) => `- ${item.name} × ${item.quantity} = ${formatUgx(item.price * item.quantity)}`)
      .join("\n");
    const message = [
      "Hello AJ Scents & More,",
      "",
      "New Order",
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Address: ${address.trim()}`,
      "",
      "Items:",
      lines,
      "",
      `Total: ${formatUgx(total)}`,
      "",
      "Please confirm my order.",
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setCart([]);
    setOrdered(true);
    setName("");
    setPhone("");
    setAddress("");
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Toaster theme="light" position="top-center" />
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <p className="hidden text-xs tracking-[0.22em] text-brass uppercase sm:block">Kampala</p>
          <a href="#top" className="font-display text-2xl tracking-tight text-fg">
            AJ Scents <span className="text-accent">&</span> More
          </a>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex min-h-11 items-center gap-2 text-sm"
            aria-label="Open cart"
          >
            Bag
            <span className="flex size-6 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-ink">
              {count}
            </span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl items-end gap-8 px-5 pt-10 pb-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs tracking-[0.28em] text-brass uppercase">House collection</p>
            <h1 className="font-display mt-4 max-w-xl text-5xl leading-[0.95] text-fg sm:text-7xl">
              Scent, leather, and the bag you keep.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              Perfumes, shoes and bags from Kampala. Choose a piece, then send the order on WhatsApp.
            </p>
            <a
              href="#shop"
              className="mt-8 inline-flex min-h-11 items-center border-b-2 border-accent pb-1 font-medium text-accent"
            >
              Browse the house
            </a>
          </div>
          <figure>
            <img
              src={products[4].image}
              alt={products[4].name}
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="mt-2 flex justify-between text-sm text-muted">
              <span>{products[4].name}</span>
              <span>Shoes</span>
            </figcaption>
          </figure>
        </section>

        <section className="mx-auto grid max-w-6xl gap-3 px-5 pb-12 sm:grid-cols-3">
          {[
            { label: "Perfumes", id: "perfume" as const, image: products[0].image },
            { label: "Shoes", id: "shoes" as const, image: products[6].image },
            { label: "Bags", id: "bags" as const, image: products[8].image },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setFilter(item.id);
                document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative h-40 overflow-hidden text-left"
            >
              <img src={item.image} alt="" className="h-full w-full object-cover" />
              <span className="absolute inset-0 bg-fg/35" />
              <span className="font-display absolute bottom-3 left-4 text-3xl text-accent-ink">{item.label}</span>
            </button>
          ))}
        </section>

        <section id="shop" className="mx-auto max-w-6xl px-5 py-8">
          <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-4xl text-fg">The edit</h2>
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={`min-h-11 px-3 text-sm ${
                    filter === item.id ? "border-b-2 border-accent font-semibold text-accent" : "text-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <article key={product.id}>
                <img src={product.image} alt={product.name} className="aspect-[3/4] w-full bg-surface-2 object-cover" />
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl leading-none">{product.name}</h3>
                  <p className="shrink-0 text-sm">{formatUgx(product.price)}</p>
                </div>
                <p className="mt-1 text-sm text-muted capitalize">{product.category}</p>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="mt-3 min-h-11 text-sm font-medium tracking-wide text-accent uppercase"
                >
                  Add to bag
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-line px-5 py-10 text-sm text-muted sm:flex-row sm:justify-between">
        <p>AJ Scents & More · Kampala</p>
        <p>Perfumes, shoes and bags · WhatsApp orders</p>
      </footer>

      <a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hello AJ Scents & More, I would like to inquire about your products.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 bottom-4 z-30 flex size-14 items-center justify-center rounded-full bg-whatsapp text-accent-ink shadow-lg"
        aria-label="Chat on WhatsApp"
      >
        <MessageIcon />
      </a>

      {cartOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-fg/40"
          aria-label="Close cart"
          onClick={() => setCartOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-surface p-5 transition-transform duration-200 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-4xl">Your bag</h2>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart" className="p-2">
            <X />
          </button>
        </div>
        <div className="mt-4 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="py-16 text-center text-muted">Your bag is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 border-b border-line py-4">
                <img src={item.image} alt="" className="size-16 object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-medium">{item.name}</h3>
                  <p className="text-sm text-muted">{formatUgx(item.price)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      className="flex size-9 items-center justify-center border border-line"
                      onClick={() => changeQty(item.id, -1)}
                      aria-label={`Decrease ${item.name}`}
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      className="flex size-9 items-center justify-center border border-line"
                      onClick={() => changeQty(item.id, 1)}
                      aria-label={`Increase ${item.name}`}
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-line pt-4">
          <p className="mb-3 text-xl">Total {formatUgx(total)}</p>
          <button
            type="button"
            onClick={openCheckout}
            className="min-h-11 w-full bg-accent font-medium text-accent-ink"
          >
            Checkout
          </button>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="mt-2 min-h-11 w-full border border-line"
          >
            Keep browsing
          </button>
        </div>
      </aside>

      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-fg/45 p-3 sm:items-center">
          <div className="max-h-[92vh] w-full max-w-md overflow-y-auto bg-surface p-5">
            {ordered ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto size-14 text-whatsapp" />
                <h2 className="font-display mt-4 text-4xl">Order ready</h2>
                <p className="mt-2 text-muted">WhatsApp should be open. We will confirm your order there.</p>
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(false)}
                  className="mt-6 min-h-11 bg-accent px-6 font-medium text-accent-ink"
                >
                  Back to the edit
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-4xl">Checkout</h2>
                  <button type="button" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout">
                    <X />
                  </button>
                </div>
                <label className="mt-4 block text-sm text-muted">
                  Full name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 min-h-11 w-full border border-line bg-bg px-3 text-fg"
                    placeholder="Your name"
                  />
                </label>
                <label className="mt-3 block text-sm text-muted">
                  Phone number
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 min-h-11 w-full border border-line bg-bg px-3 text-fg"
                    placeholder="07XXXXXXXX"
                    inputMode="tel"
                  />
                </label>
                <label className="mt-3 block text-sm text-muted">
                  Delivery address
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 min-h-20 w-full border border-line bg-bg px-3 py-2 text-fg"
                    placeholder="Street, area, city"
                  />
                </label>
                <div className="mt-4 bg-bg p-3 text-sm">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between gap-3 py-1">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>{formatUgx(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="mt-2 flex justify-between border-t border-line pt-2 font-semibold">
                    <span>Total</span>
                    <span>{formatUgx(total)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={placeOrder}
                  className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 bg-whatsapp font-medium text-accent-ink"
                >
                  Complete order on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(false)}
                  className="mt-2 min-h-11 w-full border border-line"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-hidden="true">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.1A11 11 0 0 0 20.5 3.5ZM12 20.2a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.9.7.7-3.8-.2-.3A9.2 9.2 0 1 1 12 20.2Zm5-6.9c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.2-.7.9-.8 1-.3.2-.6.1a7.5 7.5 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}
