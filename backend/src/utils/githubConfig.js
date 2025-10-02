// Redirect user to GitHub login

export const githubCongig = (req, res) => {
  const redirect_uri = "http://localhost:5000/api/auth/github/callback";
  const client_id = process.env.GITHUB_CLIENT_ID;

  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=user:email`
  );
};