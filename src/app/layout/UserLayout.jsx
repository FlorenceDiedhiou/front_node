import Navbar from './../../composants/Navbar'
import Footer from './../../composants/Footer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Navbar fixe */}
      <Navbar />

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#ffffff',
            color: '#1e293b',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 25px -5px rgba(99,102,241,0.15), 0 4px 6px -2px rgba(99,102,241,0.05)',
            fontSize: '14px',
            fontWeight: '500',
            padding: '12px 16px',
          },
          success: {
            iconTheme: { primary: '#6366f1', secondary: '#ffffff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#ffffff' },
          },
        }}
      />

      {/* Contenu principal – padding-top pour compenser la navbar fixe */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Pied de page */}
      <Footer />
    </div>
  )
}

export default UserLayout
