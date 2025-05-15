import Link from 'next/link';

export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Sign Up</h1>
        <p className="mb-4">Sign up using your Google account.</p>
        <Link href="/auth/signin" className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors inline-block">
          Go to Sign In
        </Link>
      </div>
    </div>
  );
}