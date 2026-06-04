"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUp,
  Award,
  CalendarCheck,
  Check,
  ChevronDown,
  GraduationCap,
  Heart,
  Instagram,
  MapPin,
  Menu,
  Moon,
  Phone,
  Sparkles,
  Star,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { directionsUrl, instagramUrl, phone, whatsappLink } from "@/lib/utils";

const bookMessage =
  "Hi Aura Nail Studio, I would like to book an appointment";

const nav = ["Home", "Services", "Courses", "Gallery", "Testimonials", "Contact"];

const services = [
  ["Nail Extensions", "Sculpted length, clean apex, premium finish.", "Sparkles", "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80"],
  ["Gel Nails", "Glossy, flexible gel sets for daily luxury.", "Heart", "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=80"],
  ["Acrylic Nails", "Durable acrylic overlays and extensions.", "Award", "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80"],
  ["Press-on Nails", "Custom reusable press-ons for events and shoots.", "Sparkles", "https://images.unsplash.com/photo-1610992015753-2449b0b4921f?auto=format&fit=crop&w=900&q=80"],
  ["Bridal Nails", "Statement bridal styling for your wedding story.", "Heart", "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=900&q=80"],
  ["Nail Repair", "Gentle fixes for chips, breaks, and damaged nails.", "Check", "https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&w=900&q=80"],
  ["Nail Art", "Detailed art, chrome, marble, florals, and more.", "Sparkles", "https://images.unsplash.com/photo-1599948128020-9a44505b0d1b?auto=format&fit=crop&w=900&q=80"],
  ["Makeup Services", "Soft glam and occasion-ready beauty services.", "Star", "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80"],
];

const gallery = [
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1599948128020-9a44505b0d1b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
];

const testimonials = [
  ["Simran K.", "My bridal nails were elegant, detailed, and lasted beautifully.", 5],
  ["Mehak S.", "The hygiene and finishing are honestly premium. Loved my gel set.", 5],
  ["Jasleen K.", "Tisha explains every course step with patience and practical tips.", 5],
  ["Avneet C.", "Best nail studio in Sangrur. My acrylics looked flawless.", 5],
  ["Rupinder B.", "Booked through WhatsApp and got quick confirmation. So easy.", 5],
  ["Navneet K.", "Small batch training helped me gain real confidence.", 5],
];

const appointmentSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  service: z.string().min(2, "Choose a service"),
  date: z.string().min(1, "Choose a date"),
  time: z.string().min(1, "Choose a time"),
});

const courseSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  city: z.string().min(2, "Enter your city"),
  level: z.string().min(2, "Enter your experience level"),
});

type AppointmentForm = z.infer<typeof appointmentSchema>;
type CourseForm = z.infer<typeof courseSchema>;

function IconFor({ name }: { name: string }) {
  const props = { className: "h-5 w-5" };
  if (name === "Heart") return <Heart {...props} />;
  if (name === "Award") return <Award {...props} />;
  if (name === "Check") return <Check {...props} />;
  if (name === "Star") return <Star {...props} />;
  return <Sparkles {...props} />;
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-4 font-serif text-3xl font-bold text-aura-ink dark:text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base">{text}</p>
    </div>
  );
}

export function AuraSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [popup, setPopup] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 24);
      setShowTop(window.scrollY > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    const timer = window.setTimeout(() => setPopup(true), 30000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  const appointment = useForm<AppointmentForm>({ resolver: zodResolver(appointmentSchema) });
  const course = useForm<CourseForm>({ resolver: zodResolver(courseSchema) });

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      name: "Aura Nail Studio by Tisha",
      founder: "Tisha Kalra",
      telephone: phone,
      url: "https://aura-nail-studio.vercel.app",
      sameAs: [instagramUrl],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sector 17, Gurunanak Colony",
        addressLocality: "Sangrur",
        addressRegion: "Punjab",
        addressCountry: "IN",
      },
      areaServed: "Sangrur, Punjab",
      priceRange: "₹₹",
      makesOffer: services.map(([name]) => ({ "@type": "Offer", itemOffered: name })),
    }),
    [],
  );

  function sendAppointment(data: AppointmentForm) {
    window.open(
      whatsappLink(`Hello Aura Nail Studio,\n\nI would like to book an appointment.\n\nName: ${data.name}\nPhone: ${data.phone}\nService: ${data.service}\nDate: ${data.date}\nTime: ${data.time}\n\nPlease confirm availability.`),
      "_blank",
    );
  }

  function sendCourse(data: CourseForm) {
    window.open(
      whatsappLink(`Hello Aura Nail Studio,\n\nI would like to enroll in a nail art course.\n\nName: ${data.name}\nPhone: ${data.phone}\nCity: ${data.city}\nExperience Level: ${data.level}\n\nPlease share batch details.`),
      "_blank",
    );
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <motion.div className="fixed left-0 top-0 z-[70] h-1 origin-left bg-aura-blush" style={{ scaleX }} />

      <header className={`fixed inset-x-0 top-0 z-50 transition ${solid ? "bg-white/90 shadow-sm backdrop-blur-xl dark:bg-aura-ink/90" : "bg-transparent"}`}>
        <nav className="section-shell flex h-20 items-center justify-between">
          <a href="#home" className="font-serif text-2xl font-bold text-aura-wine dark:text-aura-soft">Aura Nail Studio</a>
          <div className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-zinc-700 hover:text-aura-wine dark:text-zinc-200">{item}</a>)}
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="outline" size="sm"><a href={`tel:${phone.replaceAll(" ", "")}`}><Phone className="h-4 w-4" />Call Now</a></Button>
            <Button asChild size="sm"><a href={whatsappLink(bookMessage)} target="_blank">Book Appointment</a></Button>
            <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</Button>
          </div>
          <Button className="lg:hidden" variant="ghost" size="icon" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></Button>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[80] bg-white p-6 dark:bg-aura-ink">
          <div className="mb-8 flex items-center justify-between"><span className="font-serif text-2xl text-aura-wine">Aura</span><Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}><X /></Button></div>
          <div className="grid gap-4">{nav.map((item) => <a onClick={() => setMenuOpen(false)} key={item} href={`#${item.toLowerCase()}`} className="rounded-lg bg-aura-soft p-4 font-semibold text-aura-wine dark:bg-white/10">{item}</a>)}</div>
        </div>
      )}

      <main id="home" className="overflow-hidden">
        <section className="luxury-gradient relative min-h-screen pt-28">
          <div className="section-shell grid min-h-[calc(100vh-7rem)] items-center gap-10 pb-16 lg:grid-cols-[1fr_0.88fr]">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Badge>Premium Nail Studio & Nail Art Academy in Sangrur</Badge>
              <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-aura-ink dark:text-white sm:text-6xl lg:text-7xl">Luxury Nail Art & Professional Training in Sangrur</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-700 dark:text-zinc-200 sm:text-lg">Premium nail extensions, bridal nail styling, acrylic nails, gel nails, and internationally inspired nail training programs.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg"><a href={whatsappLink(bookMessage)} target="_blank"><CalendarCheck className="h-5 w-5" />Book Appointment</a></Button>
                <Button asChild variant="outline" size="lg"><a href={whatsappLink("Hi Aura Nail Studio, I want details about the nail art course")} target="_blank"><GraduationCap className="h-5 w-5" />Join Nail Art Course</a></Button>
              </div>
              <div className="mt-9 grid grid-cols-3 gap-3">
                {["700+ Instagram Community", "100+ Happy Clients", "Professional Training Available"].map((stat) => <Card key={stat} className="p-4 text-center text-sm font-semibold text-aura-wine dark:text-aura-soft">{stat}</Card>)}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-luxury">
                <Image priority src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85" alt="Luxury nail art at Aura Nail Studio Sangrur" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <motion.div animate={{ y: [0, -16, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -left-4 top-10 rounded-full bg-white/80 p-4 shadow-luxury backdrop-blur dark:bg-aura-ink/80"><Sparkles className="h-7 w-7 text-aura-blush" /></motion.div>
              <motion.div animate={{ y: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute -bottom-5 right-4 rounded-lg bg-aura-wine px-5 py-4 text-sm font-semibold text-white shadow-luxury">Certified Training Available</motion.div>
            </motion.div>
          </div>
        </section>

        <section className="section-shell py-12">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">{["Professional Nail Studio", "Certified Training", "Premium Products", "Hygienic Environment", "Personalized Attention", "Modern Techniques"].map((item) => <div key={item} className="flex items-center gap-2 rounded-lg bg-aura-soft p-4 text-sm font-semibold text-aura-wine dark:bg-white/10"><Check className="h-4 w-4" />{item}</div>)}</div>
        </section>

        <section id="services" className="section-shell py-20">
          <SectionTitle eyebrow="Signature Services" title="Luxury Nail & Beauty Services" text="Conversion-focused service cards with instant WhatsApp booking for every treatment." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(([name, desc, icon, image]) => <motion.article whileHover={{ y: -8 }} key={name}><Card className="h-full overflow-hidden"><div className="relative h-52"><Image src={image} alt={`${name} at Aura Nail Studio`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-500 hover:scale-105" /></div><div className="p-5"><div className="mb-3 inline-flex rounded-full bg-aura-soft p-3 text-aura-wine"><IconFor name={icon} /></div><h3 className="text-lg font-bold">{name}</h3><p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{desc}</p><Button asChild className="mt-4 w-full" variant="outline"><a target="_blank" href={whatsappLink(`Hi Aura Nail Studio, I want to book ${name}`)}>Book on WhatsApp</a></Button></div></Card></motion.article>)}</div>
        </section>

        <section className="bg-aura-soft/60 py-20 dark:bg-white/5">
          <div className="section-shell grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1"><SectionTitle eyebrow="About Aura" title="Founded by Tisha Kalra" text="Aura Nail Studio by Tisha is a premium beauty destination in Sangrur offering luxury nail services and professional nail art education." /></div>
            {["Mission: deliver creative, hygienic nail services with premium products.", "Vision: build Sangrur's most trusted nail studio and academy.", "Founder Story: Tisha Kalra blends detail, warmth, and practical training for every client and student."].map((text) => <Card key={text} className="p-6"><div className="mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-aura-blush to-aura-wine" /><p className="leading-7 text-zinc-700 dark:text-zinc-200">{text}</p></Card>)}
          </div>
        </section>

        <section className="section-shell py-20">
          <SectionTitle eyebrow="Pricing" title="Elegant Starting Prices" text="Clear entry pricing encourages inquiries while keeping custom work flexible." />
          <div className="grid gap-5 md:grid-cols-4">{[["Gel Nails", "Starting ₹999"], ["Acrylic Nails", "Starting ₹1600"], ["Press-On Nails", "Custom Pricing"], ["Nail Art Course", "Contact for Details"]].map(([name, price]) => <Card key={name} className="p-6 text-center"><h3 className="font-serif text-2xl font-bold">{name}</h3><p className="mt-4 text-aura-wine">{price}</p><Button asChild className="mt-6"><a href={whatsappLink(`Hi Aura Nail Studio, please share pricing for ${name}`)} target="_blank">Ask on WhatsApp</a></Button></Card>)}</div>
        </section>

        <section id="gallery" className="bg-aura-ink py-20 text-white">
          <div className="section-shell">
            <SectionTitle eyebrow="Gallery" title="Pinterest-Style Nail Inspiration" text="Gel nails, acrylic nails, bridal nails, nail art, and press-on designs." />
            <div className="mb-6 flex flex-wrap justify-center gap-2">{["Gel Nails", "Acrylic Nails", "Bridal Nails", "Nail Art", "Press-On Nails"].map((cat) => <Badge key={cat}>{cat}</Badge>)}</div>
            <div className="masonry">{gallery.map((src, i) => <button key={src} onClick={() => setLightbox(src)} className="masonry-item group relative h-auto w-full overflow-hidden rounded-lg"><Image src={src} alt={`Aura nail art gallery ${i + 1}`} width={800} height={i % 2 ? 980 : 680} loading="lazy" className="w-full object-cover transition duration-500 group-hover:scale-105" /></button>)}</div>
          </div>
        </section>

        <section id="courses" className="section-shell grid gap-8 py-20 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionTitle eyebrow="Nail Art Academy" title="Become a Professional Nail Artist" text="Learn from industry techniques through practical hands-on training." />
            <div className="grid gap-4 sm:grid-cols-2">{["Nail Theory", "Nail Prep", "Cuticle Care", "Dry Manicure", "Blooming Art", "Swirls", "Glitter Ombre", "Rose Art", "Marble Art", "Flower Art", "Leopard", "Cow", "Tiger", "Zebra", "Cat Eye Nail Art"].map((item) => <div key={item} className="flex items-center gap-2 rounded-lg border bg-white p-3 text-sm dark:bg-white/10"><Check className="h-4 w-4 text-aura-blush" />{item}</div>)}</div>
            <div className="mt-6 flex flex-wrap gap-2">{["International Certification", "Practice Products Included", "Small Batches", "Morning & Evening Batches"].map((b) => <Badge key={b}>✓ {b}</Badge>)}</div>
          </div>
          <Card className="p-6">
            <h3 className="font-serif text-2xl font-bold">Course Registration</h3>
            <form className="mt-6 grid gap-4" onSubmit={course.handleSubmit(sendCourse)}>
              {(["name", "phone", "city", "level"] as const).map((field) => <div key={field}><Label>{field === "level" ? "Experience Level" : field[0].toUpperCase() + field.slice(1)}</Label><Input {...course.register(field)} /><p className="mt-1 text-xs text-aura-wine">{course.formState.errors[field]?.message}</p></div>)}
              <Button type="submit" variant="whatsapp">Enroll Now</Button>
            </form>
          </Card>
        </section>

        <section className="bg-aura-soft/60 py-20 dark:bg-white/5">
          <div className="section-shell">
            <SectionTitle eyebrow="Why Choose Us" title="Premium Attention, Practical Results" text="Expert guidance, practical training, industry techniques, affordable courses, premium materials, and individual attention." />
            <div className="grid gap-4 md:grid-cols-3">{["Expert Guidance", "Practical Training", "Industry Techniques", "Affordable Courses", "Premium Materials", "Individual Attention"].map((r) => <motion.div whileHover={{ y: -6 }} key={r}><Card className="p-6"><Sparkles className="mb-4 h-6 w-6 text-aura-blush" /><h3 className="font-bold">{r}</h3></Card></motion.div>)}</div>
          </div>
        </section>

        <section id="testimonials" className="section-shell py-20">
          <SectionTitle eyebrow="Testimonials" title="Loved by Clients & Students" text="Realistic local reviews designed as a premium carousel-style grid." />
          <div className="grid gap-5 md:grid-cols-3">{testimonials.map(([name, text]) => <Card key={name} className="p-6"><div className="mb-4 flex text-aura-blush">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div><p className="leading-7 text-zinc-700 dark:text-zinc-200">“{text}”</p><div className="mt-5 flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-aura-soft" /><strong>{name}</strong></div></Card>)}</div>
        </section>

        <section className="bg-aura-ink py-20 text-white">
          <div className="section-shell text-center">
            <Instagram className="mx-auto h-10 w-10 text-aura-blush" />
            <h2 className="mt-4 font-serif text-4xl font-bold">@_theaura._</h2>
            <p className="mt-3 text-zinc-300">Follow our Instagram-style feed for fresh designs, course updates, and bridal sets.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">{gallery.map((src, i) => <div key={src + i} className="relative aspect-square overflow-hidden rounded-lg"><Image src={src} alt="Aura Instagram nail feed" fill sizes="16vw" className="object-cover" /></div>)}</div>
            <Button asChild className="mt-8" variant="blush"><a href={instagramUrl} target="_blank"><Instagram className="h-4 w-4" />Follow Us On Instagram</a></Button>
          </div>
        </section>

        <section className="section-shell py-20">
          <SectionTitle eyebrow="FAQ" title="Quick Answers" text="Everything clients and students usually ask before messaging." />
          <div className="mx-auto max-w-3xl divide-y rounded-lg border bg-white dark:bg-white/10">{["How long do nail extensions last? Usually 3-5 weeks with proper care and refills.", "Can beginners join the course? Yes, beginner-friendly batches are available.", "Do you provide certification? Yes, course students receive certification details with enrollment.", "What products are included? Practice product details are shared by WhatsApp before the batch.", "How do I book an appointment? Submit the form or tap any WhatsApp button."].map((faq) => <details key={faq} className="group p-5"><summary className="flex cursor-pointer list-none items-center justify-between font-semibold">{faq.split("?")[0]}?<ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary><p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{faq.split("? ")[1]}</p></details>)}</div>
        </section>

        <section id="contact" className="section-shell grid gap-8 py-20 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="font-serif text-3xl font-bold">Book Your Appointment</h2>
            <form className="mt-6 grid gap-4" onSubmit={appointment.handleSubmit(sendAppointment)}>
              {(["name", "phone", "service", "date", "time"] as const).map((field) => <div key={field}><Label>{field[0].toUpperCase() + field.slice(1)}</Label><Input type={field === "date" ? "date" : field === "time" ? "time" : "text"} {...appointment.register(field)} /><p className="mt-1 text-xs text-aura-wine">{appointment.formState.errors[field]?.message}</p></div>)}
              <Button type="submit" variant="whatsapp">Send Booking on WhatsApp</Button>
            </form>
          </Card>
          <div className="space-y-5">
            <Card className="p-6"><h3 className="font-serif text-2xl font-bold">Visit Aura Nail Studio</h3><p className="mt-4 flex gap-2"><Phone className="h-5 w-5 text-aura-blush" />{phone}</p><p className="mt-3 flex gap-2"><Instagram className="h-5 w-5 text-aura-blush" />@_theaura._</p><p className="mt-3 flex gap-2"><MapPin className="h-5 w-5 text-aura-blush" />Sector 17, Gurunanak Colony, Sangrur</p><div className="mt-6 flex flex-wrap gap-3"><Button asChild><a href={`tel:${phone.replaceAll(" ", "")}`}>Call Button</a></Button><Button asChild variant="whatsapp"><a href={whatsappLink(bookMessage)} target="_blank">WhatsApp Button</a></Button><Button asChild variant="outline"><a href={directionsUrl} target="_blank">Directions Button</a></Button></div></Card>
            <iframe title="Aura Nail Studio Google Maps" className="h-80 w-full rounded-lg border-0 shadow-luxury" loading="lazy" src="https://www.google.com/maps?q=Sector%2017%20Gurunanak%20Colony%20Sangrur%20Punjab&output=embed" />
          </div>
        </section>
      </main>

      <footer className="border-t bg-aura-soft/50 pb-24 pt-10 dark:bg-white/5 lg:pb-10">
        <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><p className="font-serif text-2xl text-aura-wine">Aura Nail Studio</p><div className="flex flex-wrap gap-4 text-sm"><a href="#services">Services</a><a href="#courses">Courses</a><a href={instagramUrl} target="_blank">Instagram</a><a href={whatsappLink(bookMessage)} target="_blank">WhatsApp</a><a href="#">Privacy Policy</a></div><p className="text-sm text-zinc-600 dark:text-zinc-300">© 2026 Aura Nail Studio by Tisha.</p></div>
      </footer>

      <a href={whatsappLink(bookMessage)} target="_blank" className="whatsapp-pulse fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg lg:bottom-6" aria-label="Chat With Aura Nails"><span className="hidden sm:inline">Chat With Aura Nails</span><Phone className="h-5 w-5" /></a>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t bg-white/95 p-2 text-xs font-semibold shadow-lg backdrop-blur lg:hidden dark:bg-aura-ink/95"><a href="#home" className="text-center">Home</a><a href="#services" className="text-center">Services</a><a href={whatsappLink(bookMessage)} target="_blank" className="text-center text-[#128C4A]">Book</a><a href="#contact" className="text-center">Contact</a></div>
      {showTop && <Button className="fixed bottom-24 left-4 z-50 lg:bottom-6" size="icon" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp /></Button>}
      {popup && <div className="fixed inset-0 z-[90] grid place-items-center bg-black/45 p-4"><Card className="max-w-md p-6 text-center"><button className="ml-auto block" onClick={() => setPopup(false)} aria-label="Close lead popup"><X /></button><Sparkles className="mx-auto h-10 w-10 text-aura-blush" /><h3 className="mt-4 font-serif text-3xl font-bold">Ready for your Aura set?</h3><p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">Book a nail appointment or ask for course batch details on WhatsApp.</p><Button asChild className="mt-6" variant="whatsapp"><a href={whatsappLink(bookMessage)} target="_blank">Chat on WhatsApp</a></Button></Card></div>}
      {lightbox && <div className="fixed inset-0 z-[95] grid place-items-center bg-black/80 p-4" onClick={() => setLightbox(null)}><div className="relative h-[82vh] w-full max-w-4xl"><Image src={lightbox} alt="Expanded Aura gallery nail art" fill sizes="90vw" className="object-contain" /></div></div>}
    </>
  );
}
