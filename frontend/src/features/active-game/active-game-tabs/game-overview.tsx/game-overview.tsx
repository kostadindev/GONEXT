import { Menu, Steps } from "antd";

export const GameOverview = () => {
  const description = "This is a description.";
  const earlyGame = `Clear efficiently: Focus on farming your jungle camps while keeping an eye out for potential gank opportunities.
Scuttle Control: Contest scuttle crabs to secure vision and deny the enemy jungler.
Gank when advantageous: Look for lanes that are overextended or have crowd control to set up successful ganks. Kayn's early ganks can be potent if executed well, especially if you're able to utilize his mobility through walls.
Invade when possible: If you have vision of the enemy jungler on the other side of the map or if you spot them recalling, consider invading their jungle to steal camps and apply pressure.`;

  const midGame = `Transform into Shadow Assassin or Rhaast: Depending on the enemy team composition and your preferences, aim to transform into the form that best suits the game situation.
Objective control: Help secure Rift Herald, Dragon, and towers. Use your mobility to rotate quickly between lanes and objectives.
Assassinate priority targets: As Shadow Assassin, look for opportunities to catch out squishy targets and delete them quickly with your burst damage. As Rhaast, focus on disrupting the enemy team's backline and sustaining in fights with your sustain and crowd control.
Split-push or teamfight: Decide whether to split-push in a side lane or group with your team based on the game state. Both forms can excel in different situations, so adapt accordingly.`;

  const lateGame = `Teamfighting: Stick with your team and prioritize teamfight objectives such as Baron Nashor and Elder Dragon.
Vision control: Maintain vision control around key objectives to set up picks and secure objectives safely.
Peel or dive: Assess whether your team needs you to peel for your carries or dive into the enemy backline. Adapt your playstyle accordingly.
Shotcalling: Use your map awareness and game knowledge to shotcall rotations, engage/disengage calls, and objective prioritization. Good shotcalling can often be the difference between victory and defeat in the late game.`;
  return (
    <div className="p-5">
      <Steps
        direction="vertical"
        size="small"
        current={1}
        items={[
          { title: "Early Game", description: earlyGame },
          {
            title: "Mid Game",
            description: midGame,
          },
          {
            title: "Late Game",
            description: lateGame,
          },
        ]}
      />
    </div>
  );
};
