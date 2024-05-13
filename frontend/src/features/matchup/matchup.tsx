import { Avatar, Card } from "antd";
import { Summoner, Tip } from "../../libs/league/league-types";
import {
  DislikeOutlined,
  EllipsisOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

export const Matchup = ({
  searchedSummoner,
  enemy,
}: {
  searchedSummoner: Summoner;
  enemy: Summoner;
}) => {
  const matchupInfo: Tip[] = [
    {
      label: "Pre-6 Farming",
      text: "In the early levels, focus on farming safely and avoiding unnecessary trades with Kayn. Ahri's early game is relatively weak compared to Kayn's, especially before she gets access to her ultimate.",
    },
    {
      label: "Warding",
      text: "Place wards strategically to track Kayn's movements. Kayn is highly mobile with his E (Shadow Step), so vision control is crucial to avoid surprise ganks. Place wards in river entrances and the enemy jungle to spot him early.",
    },
    {
      label: "Positioning",
      text: "Stay behind minions to avoid Kayn's W (Blade's Reach) poke. Ahri relies on her mobility to dodge skillshots and land her own abilities, so make sure to use her Q (Orb of Deception) and E (Charm) effectively while staying at a safe distance.",
    },
    {
      label: "Trading",
      text: "Look for short trades when Kayn's abilities are on cooldown. Wait for him to use his abilities before going in for a trade, then use your charm to lock him down and land your full combo.",
    },
    {
      label: "Ultimate Usage",
      text: "Save your ultimate (R - Spirit Rush) as a defensive tool to dodge Kayn's skillshots or as an engage tool when you have kill pressure. Ahri's ultimate gives her three dashes, which can be used to reposition quickly in fights.",
    },
    {
      label: "Roaming",
      text: "Ahri excels at roaming thanks to her mobility and crowd control. Keep an eye on sidelanes and look for opportunities to roam and help your teammates secure kills or objectives.",
    },
    {
      label: "Build Adaptation",
      text: "Consider building defensively if you're struggling against Kayn. Items like Zhonya's Hourglass can help you survive his burst damage, while Banshee's Veil can block his engage with W or R.",
    },
    {
      label: "Late Game",
      text: "In teamfights, focus on staying safe and dealing damage from a distance. Use your charm to peel for yourself or your carries if Kayn tries to dive onto them.",
    },
  ];

  return (
    <div className="p-4 flex flex-col">
      <div className="text-lg font-bold mb-2">{`${searchedSummoner.championName} vs ${enemy.championName} Matchup`}</div>
      <div className="flex-1 overflow-y-auto">
        <div
          className="grid grid-cols-1 gap-2"
          style={{ maxHeight: "calc(72vh - 79px)" }}
        >
          {matchupInfo.map((tip, index) => (
            <Card
              key={index}
              actions={[
                <LikeOutlined key="like" />,
                <DislikeOutlined key="dislike" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                // avatar={
                //   <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                // }
                title={tip.label}
                description={tip.text}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
