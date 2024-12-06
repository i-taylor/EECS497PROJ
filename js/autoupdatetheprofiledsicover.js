//This javascript automates the showing of the profiledesc
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://hztcovrucgaxplyruazp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dGNvdnJ1Y2dheHBseXJ1YXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTc0NTUsImV4cCI6MjA0ODkzMzQ1NX0.YUHo4a_g-IENFQIW3zQO4cHU_cAuSFJB-Bm0-ZXrgc0'
);

try {
    const Profileimageone = document.getElementById("discoverprofilepic1");
    const Profileimagetwo = document.getElementById("discoverprofilepic2");
    const Profileimagethree = document.getElementById("discoverprofilepic3");
    const Profileimagefour = document.getElementById("discoverprofilepic4");
    const Profileimagefive = document.getElementById("discoverprofilepic5");
    const Usernameone = document.getElementById("username1");
    const Usernametwo = document.getElementById("username2");
    const Usernamethree = document.getElementById("username3");
    const Usernamefour = document.getElementById("username4");
    const Usernamefive = document.getElementById("username5");
    const profileLinkOne = document.getElementById("link1");
    const profileLinkTwo = document.getElementById("link2");
    const profileLinkThree = document.getElementById("link3");
    const profileLinkFour = document.getElementById("link4");
    const profileLinkFive = document.getElementById("link5");
    

    const { data: { user } } = await supabase.auth.getUser()
    
    const loggedInUserId = user.id;

    const { data: friendConnections, error: friendError } = await supabase
        .from('FriendTable')
        .select('UID1, UID2')
        .or(`UID1.eq.${loggedInUserId},UID2.eq.${loggedInUserId}`);
    console.log(friendConnections)
    const connectedUIDs = new Set(
        friendConnections.flatMap(({ UID1, UID2 }) =>
            [UID1, UID2].filter((uid) => uid !== loggedInUserId)
        )
    );
    console.log(connectedUIDs)

    const { data: profiles, error: profileError } = await supabase
        .from('Profile_Information')
        .select('*')
        .not('UID', 'in', `(${[...connectedUIDs].join(',')})`)
        .neq('UID', loggedInUserId);
    
    console.log(profiles)

    if(profiles[0] && profiles[0].ProfilePicLink != null){
        Profileimageone.src = profiles[0].ProfilePicLink
    }
    profileLinkOne.href = `./otherusersprofile.html?uid=${profiles[0].UID}`;
    Usernameone.textContent = profiles[0].Username
    console.log(profileLinkOne.href)


    if(profiles[1] && profiles[1].ProfilePicLink != null){
        Profileimagetwo.src = profiles[1].ProfilePicLink
    }
    profileLinkTwo.href = `./otherusersprofile.html?uid=${profiles[1].UID}`;
    Usernametwo.textContent = profiles[1].Username


    if(profiles[2] && profiles[2].ProfilePicLink != null){
        Profileimagethree.src = profiles[2].ProfilePicLink
    }
    profileLinkThree.href = `./otherusersprofile.html?uid=${profiles[2].UID}`;
    Usernamethree.textContent = profiles[2].Username


    if(profiles[3] && profiles[3].ProfilePicLink != null){
        Profileimagefour.src = profiles[3].ProfilePicLink
    }
    profileLinkFour.href = `./otherusersprofile.html?uid=${profiles[3].UID}`;
    Usernamefour.textContent = profiles[3].Username


    if(profiles[4] && profiles[4].ProfilePicLink != null){
        Profileimagefive.src = profiles[4].ProfilePicLink
    }
    profileLinkFive.href = `./otherusersprofile.html?uid=${profiles[4].UID}`;
    Usernamefive.textContent = profiles[4].Username


} catch (error) {
    console.error('Error updating discovery profiles:', error.message);
}
