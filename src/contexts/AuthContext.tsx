import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'EDITOR' | 'FINANCE' | 'COMMITTEE';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in production this would come from Firebase
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@teca.org': {
    password: 'admin123', // In production, this would be hashed
    user: {
      id: '1',
      name: 'John Deng Majok',
      email: 'admin@teca.org',
      role: 'SUPER_ADMIN'
    }
  },
  'editor@teca.org': {
    password: 'editor123',
    user: {
      id: '2',
      name: 'Mary Nyandeng Akot',
      email: 'editor@teca.org',
      role: 'EDITOR'
    }
  },
  'finance@teca.org': {
    password: 'finance123',
    user: {
      id: '3',
      name: 'Peter Malual Deng',
      email: 'finance@teca.org',
      role: 'FINANCE'
    }
  },
  'committee@teca.org': {
    password: 'committee123',
    user: {
      id: '4',
      name: 'Committee Member',
      email: 'committee@teca.org',
      role: 'COMMITTEE'
    }
  }
};

const rolePermissions: Record<string, string[]> = {
  SUPER_ADMIN: ['*'], // All permissions
  EDITOR: ['read', 'write:news', 'write:events', 'write:leadership', 'write:activities', 'write:media', 'write:pages'],
  FINANCE: ['read', 'write:donations', 'write:pledges', 'read:audit'],
  COMMITTEE: ['read', 'write:donations', 'write:pledges', 'read:audit']
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('teca_admin_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('teca_admin_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email];
    if (mockUser && mockUser.password === password) {
      setUser(mockUser.user);
      localStorage.setItem('teca_admin_user', JSON.stringify(mockUser.user));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('teca_admin_user');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes('*') || userPermissions.includes(permission);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
