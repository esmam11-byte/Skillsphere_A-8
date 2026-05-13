// Simple in-memory auth for development
const users = new Map();

export async function POST(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const body = await request.json();
  
  // Sign Up
  if (path.includes("sign-up")) {
    const { email, password, name, image } = body;
    
    if (users.has(email)) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }
    
    const user = { 
      id: Date.now().toString(), 
      email, 
      name, 
      image: image || `https://ui-avatars.com/api/?name=${name}`,
      password 
    };
    users.set(email, user);
    
    return Response.json({ 
      data: { user: { id: user.id, email: user.email, name: user.name, image: user.image } } 
    });
  }
  
  // Sign In
  if (path.includes("sign-in")) {
    const { email, password } = body;
    const user = users.get(email);
    
    if (!user || user.password !== password) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }
    
    // Create session
    const sessionId = Date.now().toString();
    const session = { id: sessionId, userId: user.id };
    
    return Response.json({ 
      data: { 
        user: { id: user.id, email: user.email, name: user.name, image: user.image },
        session 
      } 
    });
  }
  
  // Get Session
  if (path.includes("get-session")) {
    return Response.json({ data: null });
  }
  
  return Response.json({ error: "Not found" }, { status: 404 });
}

export async function GET(request) {
  return POST(request);
}