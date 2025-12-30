import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { 
  LogOut, User, Plus, Search, Filter, Edit2, Trash2, 
  CheckCircle, Clock, AlertCircle, X 
} from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, pending: 0, 'in-progress': 0, completed: 0 });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: ''
  });

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    bio: user?.bio || ''
  });

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/tasks/stats/summary');
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const filterTasks = () => {
    let filtered = [...tasks];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, formData);
        toast.success('Task updated successfully');
      } else {
        await api.post('/tasks', formData);
        toast.success('Task created successfully');
      }
      fetchTasks();
      fetchStats();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        toast.success('Task deleted successfully');
        fetchTasks();
        fetchStats();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: ''
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/user/profile', profileData);
      toast.success('Profile updated successfully');
      // Update user in context
      const updatedUser = response.data.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-light_cyan-600 via-frosted_blue-700 to-sky_aqua-800">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md shadow-lg border-b-2 border-sky_aqua-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue_green-700 to-turquoise_surf-700 bg-clip-text text-transparent">PrimeTrade Dashboard</h1>
                <p className="text-sm text-deep_twilight-600">Welcome back, {user?.name}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deep_twilight-600 font-medium">Total Tasks</p>
                  <p className="text-2xl font-bold text-deep_twilight-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue_green-400 to-turquoise_surf-400 rounded-full flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="card hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deep_twilight-600 font-medium">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="card hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deep_twilight-600 font-medium">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{stats['in-progress']}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="card hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deep_twilight-600 font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="card mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1 flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky_aqua-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    className="input-field pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filters */}
                <select
                  className="input-field"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  className="input-field"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>New Task</span>
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {loading ? (
              <div className="card text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-turquoise_surf-600 mx-auto"></div>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="card text-center py-12">
                <AlertCircle className="w-12 h-12 text-sky_aqua-400 mx-auto mb-4" />
                <p className="text-deep_twilight-600">No tasks found</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div key={task._id} className="card hover:shadow-2xl transition-all duration-300 border-l-4 border-turquoise_surf-500">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="mt-1">
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-deep_twilight-900">{task.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-deep_twilight-700 mb-3">{task.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-deep_twilight-600">
                          <span className="capitalize">{task.status.replace('-', ' ')}</span>
                          {task.dueDate && (
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          )}
                          <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(task)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        {/* Task Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-deep_twilight-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue_green-700 to-turquoise_surf-700 bg-clip-text text-transparent">
                    {editingTask ? 'Edit Task' : 'Create New Task'}
                  </h2>
                  <button onClick={closeModal} className="text-deep_twilight-400 hover:text-deep_twilight-600 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      className="input-field"
                      rows="4"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        className="input-field"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        className="input-field"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      className="input-field"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" onClick={closeModal} className="btn-secondary">
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      {editingTask ? 'Update Task' : 'Create Task'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Profile Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-deep_twilight-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue_green-700 to-turquoise_surf-700 bg-clip-text text-transparent">Profile Settings</h2>
                  <button onClick={() => setShowProfileModal(false)} className="text-deep_twilight-400 hover:text-deep_twilight-600 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="input-field"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep_twilight-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="input-field bg-light_cyan-200"
                      value={user?.email}
                      disabled
                    />
                    <p className="text-xs text-deep_twilight-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      className="input-field"
                      rows="3"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" onClick={() => setShowProfileModal(false)} className="btn-secondary">
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
