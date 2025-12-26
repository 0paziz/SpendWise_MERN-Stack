import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, PieChart, ShieldCheck, Zap, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-violet-200/30 rounded-full blur-[150px] animate-pulse" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              className="flex-1 text-center lg:text-left z-10"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-50/80 backdrop-blur-md text-indigo-700 font-bold text-sm mb-8 border border-indigo-100/50 shadow-sm"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
                Financial Intelligence for Everyone
              </motion.div>
              
              <h1 className="text-6xl lg:text-[85px] font-black text-gray-900 leading-[0.95] mb-8 tracking-tighter">
                Track Every <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">Penny</span>. Rule <br />
                Your World.
              </h1>
              
              <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Ditch the spreadsheets. Experience the future of personal finance with AI-driven insights and a dashboard that feels like magic.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <Link to="/register" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-[24px] font-black text-lg hover:bg-indigo-700 transition-all shadow-[0_20px_40px_-12px_rgba(79,70,229,0.4)] flex items-center justify-center gap-3 group relative overflow-hidden">
                  <span className="relative z-10">Start Tracking Now</span>
                  <ArrowRight className="h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link to="/login" className="w-full sm:w-auto px-10 py-5 bg-white text-gray-900 border-2 border-gray-100 rounded-[24px] font-black text-lg hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center justify-center shadow-lg shadow-gray-100/50">
                  Login
                </Link>
              </div>
              
              <div className="mt-14 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.img 
                      key={i} 
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-12 h-12 rounded-full border-4 border-white shadow-xl bg-gray-100" 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                      alt="user" 
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white shadow-xl bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    +2k
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-gray-200 hidden sm:block" />
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Trusted by <span className="text-gray-900">12,000+</span> Achievers
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative"
              initial={{ scale: 0.9, opacity: 0, rotate: 5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="relative z-10 bg-white/40 backdrop-blur-3xl p-3 sm:p-6 rounded-[50px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white/50">
                <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100">
                  <img 
                    src="/dashbaord2.png" 
                    alt="Dashboard Preview" 
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-6 lg:-right-12 bg-white/90 backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-white flex items-center gap-5 z-20"
              >
                <div className="bg-emerald-100 p-3 rounded-2xl">
                  <TrendingUp className="h-8 w-8 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Total Savings</p>
                  <p className="text-2xl font-black text-gray-900">$12,450.00</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-10 -left-6 lg:-left-12 bg-white/90 backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-white flex items-center gap-5 z-20"
              >
                <div className="bg-indigo-100 p-3 rounded-2xl">
                  <PieChart className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Expense Score</p>
                  <p className="text-2xl font-black text-gray-900">98/100</p>
                </div>
              </motion.div>

              {/* Decorative Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-indigo-100 rounded-full -z-10 animate-[spin_20s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-dashed border-indigo-50 rounded-full -z-10 animate-[spin_30s_linear_infinite_reverse]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-indigo-600 font-black tracking-[0.2em] uppercase text-sm mb-4"
            >
              The Power of SpendWise
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 tracking-tight"
            >
              Everything You Need, <br />
              <span className="text-gray-400">Perfectly Synchronized</span>
            </motion.p>
          </div>
 
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Zap className="h-9 w-9" />,
                title: "Instant Tracking",
                desc: "Record your transactions in 2 taps. AI automatically categorizes your spending so you don't have to.",
                color: "bg-amber-500"
              },
              {
                icon: <PieChart className="h-9 w-9" />,
                title: "Deep Analytics",
                desc: "Beautiful, interactive charts that tell the story of your money. Understand patterns you never saw before.",
                color: "bg-indigo-600"
              },
              {
                icon: <BarChart3 className="h-9 w-9" />,
                title: "Smart Budgets",
                desc: "Predictive budgeting that helps you save for what matters. Get alerts before you overspend.",
                color: "bg-violet-600"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                className="group relative bg-gray-50/50 p-12 rounded-[48px] border border-gray-100 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.12)] transition-all duration-500 overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${feature.color} opacity-[0.03] rounded-bl-full group-hover:opacity-[0.08] transition-opacity`} />
                
                <div className={`${feature.color} w-20 h-20 rounded-3xl flex items-center justify-center text-white mb-10 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-6">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-xl font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-32">
            <div className="flex-1">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-5xl font-black text-gray-900 mb-16 tracking-tight"
              >
                Getting Started is <span className="text-indigo-600">Effortless</span>
              </motion.h2>
              <div className="space-y-16">
                {[
                  { step: "01", title: "Create an Account", desc: "Sign up in seconds. No credit card required. Experience the full power of SpendWise immediately." },
                  { step: "02", title: "Sync Your Life", desc: "Add your income sources and recurring expenses. Watch as your financial map begins to form." },
                  { step: "03", title: "Grow Your Wealth", desc: "Use our automated insights to identify leaks and double your savings within months." }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex gap-8 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="text-6xl font-black text-gray-100 leading-none group-hover:text-indigo-50 transition-colors duration-500">{item.step}</span>
                    <div>
                      <h4 className="text-2xl font-black text-gray-900 mb-3">{item.title}</h4>
                      <p className="text-gray-500 text-lg leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-indigo-600 rounded-[60px] p-16 relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(79,70,229,0.3)]">
                {/* Decorative mesh */}
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
                
                <div className="text-center relative z-10">
                  <div className="inline-flex p-5 rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 mb-10 shadow-2xl">
                    <ShieldCheck className="h-14 w-14 text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-8">Military-Grade Security</h3>
                  <p className="text-indigo-100 text-xl leading-relaxed mb-12 font-medium">
                    We use AES-256 encryption to protect your data. Your privacy is our #1 priority. Always.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-[32px] p-8 border border-white/20">
                      <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-2">Users</p>
                      <p className="text-white text-3xl font-black italic">12k+</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-[32px] p-8 border border-white/20">
                      <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-2">Rating</p>
                      <p className="text-white text-3xl font-black italic">4.9/5</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative small element */}
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-10 -right-10 w-40 h-40 border-8 border-indigo-50 rounded-full -z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
