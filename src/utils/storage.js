// Utility functions for localStorage management

export const getStorageKey = (username, type) => {
  return `${type}-${username}`;
};

export const loadMedications = (username) => {
  try {
    const key = getStorageKey(username, 'medications');
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading medications:', error);
    return [];
  }
};

export const saveMedications = (username, medications) => {
  try {
    const key = getStorageKey(username, 'medications');
    localStorage.setItem(key, JSON.stringify(medications));
  } catch (error) {
    console.error('Error saving medications:', error);
  }
};

export const loadVitals = (username) => {
  try {
    const key = getStorageKey(username, 'vitals');
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading vitals:', error);
    return [];
  }
};

export const saveVitals = (username, vitals) => {
  try {
    const key = getStorageKey(username, 'vitals');
    localStorage.setItem(key, JSON.stringify(vitals));
  } catch (error) {
    console.error('Error saving vitals:', error);
  }
};

export const getCurrentUser = () => {
  try {
    return localStorage.getItem('currentUser');
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const setCurrentUser = (username) => {
  try {
    if (username) {
      localStorage.setItem('currentUser', username);
    } else {
      localStorage.removeItem('currentUser');
    }
  } catch (error) {
    console.error('Error setting current user:', error);
  }
};

// User credentials management
export const registerUser = (fullname, email, password) => {
  try {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'Email already exists' };
    }
    // Generate username from email for backward compatibility
    const username = email.split('@')[0];
    users.push({ 
      fullname, 
      email: email.toLowerCase(), 
      password,
      username // Keep for backward compatibility with data storage
    });
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true, username };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: 'Error registering user' };
  }
};

// Simple username-based authentication (no password required)
export const authenticateUser = (username) => {
  try {
    // Check if user exists in registered users
    const users = getUsers();
    const user = users.find(u => u.username === username || u.email?.split('@')[0] === username);
    
    if (user) {
      return { success: true, username: user.username || username, user };
    }
    
    // If user doesn't exist, create a simple session (username-only login)
    // This allows any username to login without registration
    return { success: true, username: username };
  } catch (error) {
    console.error('Error authenticating user:', error);
    return { success: false, message: 'Error authenticating user' };
  }
};

export const getUserByEmail = (email) => {
  try {
    const users = getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
};

export const getUserByUsername = (username) => {
  try {
    const users = getUsers();
    return users.find(u => u.username === username);
  } catch (error) {
    console.error('Error getting user by username:', error);
    return null;
  }
};

export const getUsers = () => {
  try {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

