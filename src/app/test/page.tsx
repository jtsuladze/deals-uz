import { dataStore } from '../../stores/dataStore';

export default function DataStoreTest() {
  const handleTest = () => {
    console.log('=== DataStore Test ===');
    
    // Add a test post
    const testPost = dataStore.addPost({
      title: 'Test Post',
      description: 'This is a test post',
      price: 100,
      category: 'electronics',
      subcategory: undefined,
      type: 'item',
      condition: 'new',
      location: 'Test Location',
      coordinates: undefined,
      userId: 'test-user',
      userName: 'Test User',
      userEmail: 'test@test.com',
      userPhone: '+123456789',
      images: [],
      tags: [],
      status: 'active',
      isFeatured: false,
      contactPreference: 'both'
    });
    
    console.log('Added test post:', testPost);
    
    // Search all posts
    const allPosts = dataStore.searchPosts({});
    console.log('All posts in dataStore:', allPosts);
    
    // Search with empty filters (like browse page)
    const filteredPosts = dataStore.searchPosts({
      category: '',
      minPrice: undefined,
      maxPrice: undefined,
      condition: '',
      location: '',
      sortBy: 'newest'
    });
    console.log('Filtered posts (like browse page):', filteredPosts);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>DataStore Test</h2>
      <button onClick={handleTest} style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
        Test DataStore
      </button>
    </div>
  );
}
