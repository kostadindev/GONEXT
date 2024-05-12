import { Card, Typography } from "antd";
import { Game, Summoner, Tips } from "../../libs/league/league-types";
import Meta from "antd/es/card/Meta";

export const HistoryBlock = ({ game }: { game?: Game }) => {
  const summoner = game?.participants[0] as Summoner;
  return (
    <Card>
      <div className="flex text-xs">
        <div className="w-1/4">
          <Typography.Title level={5} style={{ margin: 0 }}>
            Ranked Solo
          </Typography.Title>
          <div className="mb-3">A day ago</div>
          <div className="italic">Victory</div>
          <div>25m 25s</div>
        </div>
        <div className="w-1/2"></div>
        <div className="w-1/4">
          <div className="mb-4">Section 3</div>
          <div>Section 3</div>
        </div>
      </div>
    </Card>
  );
};

export const MatchHistory = ({ summoner }: { summoner: Summoner }) => {
  const matchupInfo: Tips[] = [
    {
      label: "Pre-6 Farming",
      text: "In the early levels, focus on farming safely and avoiding unnecessary trades with Kayn. Ahri's early game is relatively weak compared to Kayn's, especially before she gets access to her ultimate.",
    },
    {
      label: "Warding",
      text: "Place wards strategically to track Kayn's movements. Kayn is highly mobile with his E (Shadow Step), so vision control is crucial to avoid surprise ganks. Place wards in river entrances and the enemy jungle to spot him early.",
    },
  ];

  return (
    <div className="p-4 rounded-lg flex flex-col">
      <div className="text-lg font-bold mb-2">{`${summoner?.championName}'s Match History`}</div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-2">
          {matchupInfo.map((tip, index) => (
            <HistoryBlock key={index}></HistoryBlock>
          ))}
        </div>
      </div>
    </div>
  );
};
