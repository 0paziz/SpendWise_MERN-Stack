import { useState, useEffect } from 'react';
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Calendar,
  Filter,
  MoreVertical,
  ArrowRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import SummaryCard from '../components/SummaryCard';
import api from '../services/api';
import { useNavigate } from "react-router-dom";

const MOCK_CHART_DATA = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
];

const MOCK_PIE_DATA = [
  { name: 'Food', value: 400 },
  { name: 'Rent', value: 1200 },
  { name: 'Entertainment', value: 300 },
  { name: 'Transport', value: 200 },
];

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    balance: 0,
    income: 0,
    expense: 0,
    expensesByCategory: [],
    byMonth: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [summaryRes, transactionsRes] = await Promise.all([
          api.get('/transections/summary'),
          api.get('/transections')
        ]);
        setStats(summaryRes.data);
        setTransactions(transactionsRes.data.slice(0, 5)); // Just show recent 5
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = stats.byMonth.map(m => ({
    name: m.month,
    income: m.income,
    expense: m.expense
  }));

  const pieData = stats.expensesByCategory.map(c => ({
    name: c.category,
    value: c.total
  }));
  const handleAddTransaction = () => {
      navigate('/add-transaction');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">My Dashboard</h1>
          <p className="text-gray-500 font-medium">Welcome back! Here's what's happening with your money.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <Calendar className="h-5 w-5 text-gray-400" />
            Last 30 Days
          </button>
          <button onClick={handleAddTransaction} className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            <Plus className="h-5 w-5" />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
          title="Total Balance" 
          amount={stats.balance} 
          icon={Wallet} 
          percentage={0} // Percentage not in base summary yet
          color="indigo"
        />
        <SummaryCard 
          title="Total Income" 
          amount={stats.income} 
          icon={TrendingUp} 
          percentage={0}
          color="emerald"
        />
        <SummaryCard 
          title="Total Expense" 
          amount={stats.expense} 
          icon={TrendingDown} 
          percentage={0}
          color="rose"
        />
        <SummaryCard 
          title="Transactions" 
          amount={transactions.length} 
          icon={Plus} 
          percentage={0}
          color="amber"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900">Statistics</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-2 text-xs font-bold text-gray-400 px-3 py-1.5 border border-gray-100 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Income
              </span>
              <span className="flex items-center gap-2 text-xs font-bold text-gray-400 px-3 py-1.5 border border-gray-100 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-rose-400"></div> Expense
              </span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.length > 0 ? chartData : [{name: 'No Data', income: 0, expense: 0}]}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorIncome)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="expense" 
                  stroke="#fb7185" 
                  strokeWidth={3}
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-8">ByCategory</h3>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData.length > 0 ? pieData : [{name: 'None', value: 1}]}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  {pieData.length === 0 && <Cell fill="#f1f5f9" />}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-gray-400 text-sm font-bold">Spent</p>
              <p className="text-2xl font-black text-gray-900">${stats.expense.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-auto space-y-4">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-sm font-bold text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-black text-gray-900">${item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 flex items-center justify-between border-b border-gray-50">
          <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
          <button onClick={() => navigate('/transactions')} className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
            See All Transactions
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Transaction</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-8 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-8 py-5 text-center text-xs font-bold text-gray-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {t.type === 'income' ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                      </div>
                      <span className="font-bold text-gray-900">{t.description || t.category}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-gray-500 font-medium text-sm">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td className={`px-8 py-6 text-right font-black ${t.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
