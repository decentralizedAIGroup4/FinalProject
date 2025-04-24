// Simple script to test the agent API
const fetch = require('node-fetch');

async function testAgent() {
  try {
    console.log('Testing agent API...');
    
    const response = await fetch('http://localhost:3000/api/chat/simple-agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: "What is Brent's profession?" }),
    });
    
    console.log('Response status:', response.status);
    
    const data = await response.json();
    console.log('Response data:', data);
    
    if (data.response) {
      console.log('Agent response:', data.response);
    } else {
      console.log('No response received from agent');
    }
  } catch (error) {
    console.error('Error testing agent:', error);
  }
}

testAgent();
