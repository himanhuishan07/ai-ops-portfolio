export async function getGitHubProjects(username) {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?type=owner&sort=updated&per_page=10`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 }, // Cache revalidates once every hour
      }
    );

    if (!res.ok) throw new Error("GitHub API fetch failed");
    const repos = await res.json();

    // Filter out forks and transform payload
    return repos
      .filter((repo) => !repo.fork && repo.stargazers_count >= 0)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "No description provided.",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || "Python",
        url: repo.html_url,
        updatedAt: new Date(repo.updated_at).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
      }));
  } catch (error) {
    console.error("GitHub Fetch Error:", error);
    return [];
  }
}