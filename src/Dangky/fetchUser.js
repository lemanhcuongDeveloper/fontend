export const registerUser = async (user) => {
  try {
    const response = await fetch('http://localhost:9000/user-api/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to register user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in registerUser:', error);
    throw error;
  }
};
