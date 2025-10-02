const handleGithubLogin = () => {
  window.location.href = "http://localhost:5000/api/auth/github";
};

export const GithubAuthPage = () => {
  return <button onClick={handleGithubLogin} className="text-red-500">Login with GitHub</button>
};
