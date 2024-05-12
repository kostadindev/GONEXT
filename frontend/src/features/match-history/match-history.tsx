import { Game, Summoner, Tips } from "../../libs/league/league-types";

export const HistoryBlock = ({ game }: { game?: Game }) => {
  const summoner = game?.participants[0] as Summoner;
  return (
    <div className="flex border border-black-700 text-xs">
      <div className="w-1/4 p-4">
        <div className="text-sm font-bold">Ranked Solo</div>
        <div className="mb-1">A day ago</div>
        <div className="italic">Victory</div>
        <div>25m 25s</div>
      </div>
      <div className="w-1/2 p-4"></div>
      <div className="w-1/4 p-4">
        <div className="mb-4">Section 3</div>
        <div>Section 3</div>
      </div>
    </div>
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
