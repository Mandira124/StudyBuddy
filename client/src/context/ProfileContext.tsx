// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
// src/contexts/ProfileContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState('');
  const { userId } = useParams(); // Assuming you get the userId from the URL

  useEffect(() => {
    // Function to fetch name from an API
    const fetchName = async () => {
      try {
        // Replace the URL with your actual endpoint
        const response = await fetch(`https://api.example.com/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching the name:', error);
      }
    };

    fetchName();
  }, [userId]);

  return (
    <ProfileContext.Provider value={name}>
      {children}
    </ProfileContext.Provider>
  );
};
