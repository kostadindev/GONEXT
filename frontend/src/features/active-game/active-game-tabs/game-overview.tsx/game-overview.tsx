import { Card, theme } from "antd";
import {
  DislikeOutlined,
  EllipsisOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

const { useToken } = theme;

const GamePhaseCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Card
    actions={[
      <LikeOutlined key="like" />,
      <DislikeOutlined key="dislike" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta title={title} description={description} />
  </Card>
);

const earlyGameDescription = `Clear efficiently: Focus on farming your jungle camps while keeping an eye out for potential gank opportunities.
Scuttle Control: Contest scuttle crabs to secure vision and deny the enemy jungler.
Gank when advantageous: Look for lanes that are overextended or have crowd control to set up successful ganks. Kayn's early ganks can be potent if executed well, especially if you're able to utilize his mobility through walls.
Invade when possible: If you have vision of the enemy jungler on the other side of the map or if you spot them recalling, consider invading their jungle to steal camps and apply pressure.`;

const midGameDescription = `Transform into Shadow Assassin or Rhaast: Depending on the enemy team composition and your preferences, aim to transform into the form that best suits the game situation.
Objective control: Help secure Rift Herald, Dragon, and towers. Use your mobility to rotate quickly between lanes and objectives.
Assassinate priority targets: As Shadow Assassin, look for opportunities to catch out squishy targets and delete them quickly with your burst damage. As Rhaast, focus on disrupting the enemy team's backline and sustaining in fights with your sustain and crowd control.
Split-push or teamfight: Decide whether to split-push in a side lane or group with your team based on the game state. Both forms can excel in different situations, so adapt accordingly.`;

const lateGameDescription = `Teamfighting: Stick with your team and prioritize teamfight objectives such as Baron Nashor and Elder Dragon.
Vision control: Maintain vision control around key objectives to set up picks and secure objectives safely.
Peel or dive: Assess whether your team needs you to peel for your carries or dive into the enemy backline. Adapt your playstyle accordingly.
Shotcalling: Use your map awareness and game knowledge to shotcall rotations, engage/disengage calls, and objective prioritization. Good shotcalling can often be the difference between victory and defeat in the late game.`;

export const GameOverview = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = useToken();

  return (
    <div
      className="w-1/2 mx-0 flex flex-col gap-2 overflow-y-auto"
      style={{ height: "calc(77vh)" }}
    >
      <GamePhaseCard title="Early Game" description={earlyGameDescription} />
      <GamePhaseCard title="Mid Game" description={midGameDescription} />
      <GamePhaseCard title="Late Game" description={lateGameDescription} />
    </div>
  );
};
