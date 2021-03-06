import React from "react";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import FriendCard from "./components/FriendCard";
import friends from "./friends.json";
/*
import SpongeBobCard from "./components/SpongeBobCard";
import SquidwardCard from "./components/SquidwardCard";
import MrKrabsCard from "./components/MrKrabsCard";
*/

function App() {
  return (
    <Wrapper>
      <Title>Friends List</Title>
      {
        friends.map((friend, index) => (
          <FriendCard
            key={index}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))
      }
    </Wrapper>
  );
}

export default App;
