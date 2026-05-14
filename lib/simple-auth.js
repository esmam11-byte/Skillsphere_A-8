export const simpleAuth = {
  register: (email, password, name, image) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
      return { error: "User already exists" };
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      image: image || `https://ui-avatars.com/api/?name=${name}`
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { data: { user: { id: newUser.id, email, name, image: newUser.image } } };
  },
  
  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { error: "Invalid credentials" };
    }
    
    localStorage.setItem('session', JSON.stringify({ userId: user.id, user }));
    return { data: { user: { id: user.id, email: user.email, name: user.name, image: user.image } } };
  },
  
  logout: () => {
    localStorage.removeItem('session');
  },
  
  getSession: () => {
    const session = localStorage.getItem('session');
    return { data: session ? JSON.parse(session) : null };
  }
};
