import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
        setUsername(response.data.username);
        setUserId(response.data.id);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const updateData = { username };
    if (password) {
      updateData.password = password;
    }
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/users/${userId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Profile deleted successfully');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      {profile ? (
        <div>
          <p><strong>ID:</strong> {userId}</p> {/* Anzeige der Benutzer-ID */}
          <form onSubmit={handleUpdate}>
            <div>
              <label>Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current password" />
            </div>
            <button type="submit">Update Profile</button>
          </form>
          <button onClick={handleDelete}>Delete Profile</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
