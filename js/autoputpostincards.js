import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://hztcovrucgaxplyruazp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dGNvdnJ1Y2dheHBseXJ1YXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTc0NTUsImV4cCI6MjA0ODkzMzQ1NX0.YUHo4a_g-IENFQIW3zQO4cHU_cAuSFJB-Bm0-ZXrgc0'
);

// Asynchronous function to load posts
async function loadUserPosts() {
  try {
    console.log("Loading posts...");

    const container = document.getElementById("profilepostcontainer");

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
      throw new Error(`Failed to get user: ${userError.message}`);
    }

    if (!user) {
      console.error("No user is logged in");
      return;
    }

    const userId = user.id;

    // Fetch posts for the user
    const { data: posts, error: postsError } = await supabase
      .from('Posts')
      .select('*')
      .eq('UID', userId);

    if (postsError) {
      throw new Error(`Failed to fetch posts: ${postsError.message}`);
    }

    if (posts.length === 0) {
      console.log("No posts found for the user.");
      return;
    }

    // Clear the container before appending posts
    container.innerHTML = '';

    for (const post of posts) {
      // Fetch user profile information for the post
      const { data: profile, error: profileError } = await supabase
        .from('Profile_Information')
        .select('*')
        .eq('UID', userId)
        .single();

      if (profileError) {
        console.error(`Failed to fetch profile: ${profileError.message}`);
        continue; // Skip this post if there's an error fetching the profile
      }

      const card = createPostCard(
        profile.Username,
        post.Content,
        post.Likes,
        post.Caption,
        profile.ProfilePicLink
      );
      container.appendChild(card);
    }

  } catch (error) {
    console.error('Error loading user posts:', error.message);
  }
}

// Function to create a post card
function createPostCard(username, postContent, likes, caption, pfp) {
  const card = document.createElement("div");
  card.className = "post-card";

  // Header
  const header = document.createElement("div");
  header.className = "post-header";
  header.innerHTML = `
    <img src="${pfp}" alt="${username}" class="profile-pic">
    <p>${username}</p>
  `;

  // Content
  const content = document.createElement("div");
  content.className = "post-content";
  const img = document.createElement("img");
  img.src = postContent;
  img.alt = caption || "Post image";
  content.appendChild(img);

  // Description
  const desc = document.createElement("div");
  desc.className = "post-description";
  desc.textContent = caption || "No caption provided";

  // Append all elements to the card
  card.appendChild(header);
  card.appendChild(desc);
  card.appendChild(content);

  return card;
}

// Load posts when the script runs
loadUserPosts();
