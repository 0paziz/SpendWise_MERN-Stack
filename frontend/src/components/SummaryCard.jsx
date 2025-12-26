import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SummaryCard = ({ title, amount, type, percentage, icon: Icon, color }) => {
  const isPositive = percentage > 0;
  
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600 shadow-indigo-100",
    emerald: "bg-emerald-50 text-emerald-600 shadow-emerald-100",
    rose: "bg-rose-50 text-rose-600 shadow-rose-100",
    amber: "bg-amber-50 text-amber-600 shadow-amber-100",
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl ${colors[color] || colors.indigo}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          {Math.abs(percentage)}%
        </div>
      </div>
      
      <div>
        <p className="text-gray-500 font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-black text-gray-900 tracking-tight">
          ${amount.toLocaleString()}
        </h3>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
