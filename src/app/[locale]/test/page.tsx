'use client';

import React, { useState, useEffect } from 'react';
import { dataStore } from '../../../stores/dataStore';
import { Post } from '../../../types';

export default function DataStoreTest() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const log = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    console.log(message);
  };

  useEffect(() => {
    runTests();
  }, []);

  const runTests = () => {
    log('=== DataStore Diagnostics ===');
    
    // Test 1: Check initial posts
    const initialPosts = dataStore.searchPosts({});
    log(`Initial posts count: ${initialPosts?.length || 0}`);
    const allPosts = dataStore.getAllPosts();
    log(`Total posts in dataStore: ${allPosts.length}`);
    log(`Active posts: ${allPosts.filter(p => p.status === 'active').length}`);
    
    if (initialPosts && initialPosts.length > 0) {
      log(`Sample post: ${initialPosts[0].title} (${initialPosts[0].type})`);
      log(`Sample post ID: ${initialPosts[0].id}`);
      log(`Sample post status: ${initialPosts[0].status}`);
    }
    setPosts(initialPosts || []);

    // Test 2: Add a new post
    const testPost: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'favorites'> = {
      title: `TEST ITEM - Debug Post ${Date.now()}`,
      description: 'This is a test post created for debugging',
      price: 999,
      category: 'electronics',
      type: 'item',
      condition: 'new',
      location: 'Tashkent',
      userId: 'test-user-123',
      userName: 'Test User',
      userEmail: 'test@example.com',
      userPhone: '+998901234567',
      images: [],
      tags: [],
      status: 'active',
      isFeatured: false,
      contactPreference: 'both'
    };

    try {
      log(`About to add post: ${testPost.title}`);
      const addedPost = dataStore.addPost(testPost);
      log(`Successfully added post with ID: ${addedPost.id}`);
      log(`Added post status: ${addedPost.status}`);
      
      // Test 3: Search again after adding
      const postsAfterAdd = dataStore.searchPosts({});
      log(`Posts count after adding: ${postsAfterAdd?.length || 0}`);
      
      // Test 4: Verify the added post is in results
      const foundAddedPost = postsAfterAdd?.find(p => p.id === addedPost.id);
      log(`Added post found in search results: ${foundAddedPost ? 'YES' : 'NO'}`);
      
      if (foundAddedPost) {
        log(`Found post title: ${foundAddedPost.title}`);
      }
      
      setPosts(postsAfterAdd || []);

      // Test 5: Search with filters
      const itemsOnly = dataStore.searchPosts({ type: 'item' });
      log(`Items only count: ${itemsOnly?.length || 0}`);

      const servicesOnly = dataStore.searchPosts({ type: 'service' });
      log(`Services only count: ${servicesOnly?.length || 0}`);

      // Test 6: Check if new post appears in items filter
      const newPostInItems = itemsOnly?.find(p => p.id === addedPost.id);
      log(`New post appears in items filter: ${newPostInItems ? 'YES' : 'NO'}`);

    } catch (error) {
      log(`Error adding post: ${error}`);
    }
  };

  const clearLogs = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">DataStore Diagnostics</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Test Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Test Results</h2>
              <button 
                onClick={clearLogs}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Clear
              </button>
            </div>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono bg-gray-100 p-2 rounded">
                  {result}
                </div>
              ))}
            </div>
          </div>

          {/* Current Posts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Current Posts ({posts.length})</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {posts.map((post) => (
                <div key={post.id} className="border rounded p-3">
                  <div className="font-semibold">{post.title}</div>
                  <div className="text-sm text-gray-600">
                    Type: {post.type} | Category: {post.category}
                  </div>
                  <div className="text-sm text-gray-600">
                    Price: {post.price} UZS
                  </div>
                  <div className="text-xs text-gray-400">
                    ID: {post.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-x-4">
          <button 
            onClick={runTests}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Run Tests Again
          </button>
          <a 
            href="/en/browse"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Check Browse Page
          </a>
        </div>
      </div>
    </div>
  );
}
