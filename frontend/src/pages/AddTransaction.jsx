import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  DollarSign, 
  Calendar, 
  Tag, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const AddTransaction = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = {
    expense: ['Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Education', 'Other'],
    income: ['Salary', 'Freelance', 'Investments', 'Gift', 'Other']
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (type) => {
    setFormData({ 
      ...formData, 
      type, 
      category: categories[type][0] 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await api.post('/transections/create', formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to add transaction', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 shadow-sm transition-all"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Add Transaction</h1>
          <p className="text-gray-500 font-medium">Record a new income or expense</p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Transaction Type Selector */}
          <div className="flex p-2 bg-gray-50 rounded-[28px] border border-gray-100">
            <button
              type="button"
              onClick={() => handleTypeChange('expense')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[22px] font-bold transition-all ${
                formData.type === 'expense' 
                ? 'bg-white text-rose-600 shadow-lg shadow-rose-100/50' 
                : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <TrendingDown className={`h-5 w-5 ${formData.type === 'expense' ? 'text-rose-600' : ''}`} />
              Expense
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('income')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[22px] font-bold transition-all ${
                formData.type === 'income' 
                ? 'bg-white text-emerald-600 shadow-lg shadow-emerald-100/50' 
                : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <TrendingUp className={`h-5 w-5 ${formData.type === 'income' ? 'text-emerald-600' : ''}`} />
              Income
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-3">Description</label>
              <div className="relative">
                <FileText className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="e.g. Monthly Rent"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all font-bold text-xl"
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Date</label>
              <div className="relative">
                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Category</label>
              <div className="relative">
                <Tag className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all font-medium appearance-none"
                >
                  {categories[formData.type].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-5 rounded-[24px] font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-6 w-6" />
                Save Transaction
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
