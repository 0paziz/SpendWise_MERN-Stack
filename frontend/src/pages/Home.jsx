import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  PieChart,
  ShieldCheck,
  Zap,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ------------------ animations ------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

/* ------------------ data ------------------ */
const features = [
  {
    Icon: Zap,
    title: 'Instant Tracking',
    desc: 'Add expenses in seconds. Everything is categorized automatically',
    color: 'bg-amber-500'
  },
  {
    Icon: PieChart,
    title: 'Clear Analytics',
    desc: 'Simple charts that show where your money actually goes',
    color: 'bg-indigo-600'
  },
  {
    Icon: BarChart3,
    title: 'Smart Budgets',
    desc: 'Get warnings before you overspend and stay on track',
    color: 'bg-violet-600'
  }
];

/* ------------------ components ------------------ */
const FeatureCard = ({ Icon, title, desc, color }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -8 }}
    className="group bg-gray-50 p-10 rounded-[40px] border border-gray-100 hover:bg-white transition"
  >
    <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8`}>
      <Icon size={28} />
    </div>

    <h3 className="text-2xl font-black mb-4 text-gray-900">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </motion.div>
);

/* ------------------ page ------------------ */
const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-28 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[480px] h-[480px] bg-indigo-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[560px] h-[560px] bg-violet-200/30 rounded-full blur-[140px]" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate="visible"
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="text-6xl lg:text-[80px] font-black leading-[0.95] mb-8 tracking-tight">
                Track every <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  penny
                </span>
              </h1>

              <p className="text-xl text-gray-500 mb-12 max-w-xl mx-auto lg:mx-0">
                Simple money tracking with insights that actually make sense
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="px-9 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 transition"
                >
                  Start tracking
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative"
            >
              <div className="bg-white p-4 rounded-[40px] shadow-2xl border border-gray-100">
                <img
                  src="/dashbaord2.png"
                  alt="Dashboard"
                  className="rounded-[32px]"
                />
              </div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -right-8 bg-white p-5 rounded-3xl shadow-xl flex items-center gap-4"
              >
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <TrendingUp className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Savings</p>
                  <p className="text-xl font-black">$12,450</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 mb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              Everything you need
            </h2>
            <p className="text-gray-400 text-lg">
              No clutter. No confusion.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10"
          >
            {features.map(feature => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="py-28 bg-indigo-600 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <ShieldCheck size={64} className="mx-auto mb-8 opacity-90" />
          <h3 className="text-4xl font-black mb-6">
            Your data stays yours
          </h3>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            Industry-standard encryption keeps your financial information safe at all times
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
