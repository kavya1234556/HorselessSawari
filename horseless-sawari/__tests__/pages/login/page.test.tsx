import React from 'react';
import '@testing-library/jest-dom';
import { describe } from 'node:test';
import { render, fireEvent } from '@testing-library/react';
import LoginPage from '@/app/login/page';

describe('LoginPage Component', () => {
  test('renders login form correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginPage />);

    // Check if form elements are rendered correctly
    expect(getByText('Welcome Back!')).toBeInTheDocument();
    expect(getByText('Please Log in to your Account.')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Forget password?')).toBeInTheDocument();
    expect(getByText('Sign in')).toBeInTheDocument();
    expect(getByText('CREATE MY ACCOUNT')).toBeInTheDocument();
  });
  // test('username and password input fields are editable', () => {
  //   const { getByPlaceholderText } = render(<LoginPage />);

  //   // Simulate user input in username and password fields
  //   const usernameInput = getByPlaceholderText('Enter username');
  //   const passwordInput = getByPlaceholderText('Password');

  //   fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  //   fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

  //   // Check if input values are updated
  //   expect(usernameInput).toBe('testuser');
  //   expect(passwordInput).toBe('testpassword');
  // });

  // Add more test cases as needed
});
