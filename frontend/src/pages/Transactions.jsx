import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Trash2, 
  Edit2,
  X,
  TrendingUp, 
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  DollarSign,
  Calendar,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editFormData, setEditFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    date: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const exportToCSV = () => {
    if (filteredTransactions.length === 0) return;

    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = filteredTransactions.map(t => [
      new Date(t.date).toLocaleDateString(),
      t.description || t.category,
      t.category,
      t.type,
      t.amount
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await api.get('/transections');
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditInit = (transaction) => {
    setEditingTransaction(transaction._id);
    setEditFormData({
      description: transaction.description || '',
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: new Date(transaction.date).toISOString().split('T')[0]
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await api.put(`/transections/${editingTransaction}`, editFormData);
      await fetchTransactions();
      setEditingTransaction(null);
    } catch (error) {
      console.error('Failed to update transaction', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredTransactions = transactions.filter(t => {
    const searchField = t.description || '';
    const matchesSearch = searchField.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transections/${id}`);
      setTransactions(transactions.filter(t => t._id !== id));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete transaction', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Transactions</h1>
          <p className="text-gray-500 font-medium">Keep track of every penny you spend or earn.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
          >
            <Download className="h-5 w-5 text-gray-400" />
            Export CSV
          </button>
          <button 
            onClick={() => navigate('/add-transaction')}
            className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus className="h-5 w-5" />
            Add New
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none"
          />
        </div>
        <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
          {['all', 'income', 'expense'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${
                filterType === type 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <button className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 hover:text-indigo-600 transition-all">
          <Filter className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Transaction</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-8 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-8 py-5 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode='popLayout'>
                {filteredTransactions.map((t) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={t._id} 
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
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
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleEditInit(t)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(t._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="py-20 text-center">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Search className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        )}

        <div className="p-8 border-t border-gray-50 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">
            Showing <span className="text-gray-900 font-bold">{filteredTransactions.length}</span> transactions
          </p>
          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl border border-gray-100 text-gray-400 hover:text-gray-900 disabled:opacity-30" disabled>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-2.5 rounded-xl border border-gray-100 text-indigo-600 bg-indigo-50 font-bold">1</button>
            <button className="p-2.5 rounded-xl border border-gray-100 text-gray-400 hover:text-gray-900">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingTransaction && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[32px] p-8 max-w-lg w-full shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Edit Transaction</h3>
              <button 
                onClick={() => setEditingTransaction(null)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <div className="relative">
                    <Edit2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={editFormData.description}
                      onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      step="0.01"
                      value={editFormData.amount}
                      onChange={(e) => setEditFormData({...editFormData, amount: e.target.value})}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-bold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={editFormData.date}
                      onChange={(e) => setEditFormData({...editFormData, date: e.target.value})}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setEditingTransaction(null)}
                  className="flex-1 py-4 bg-gray-50 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-70"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl"
          >
            <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center text-red-600 mb-6">
              <Trash2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Transaction?</h3>
            <p className="text-gray-500 mb-8 font-medium">This action cannot be undone. Are you sure you want to delete this record?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-4 bg-gray-50 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
