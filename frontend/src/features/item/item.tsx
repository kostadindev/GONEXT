import { Avatar } from "antd";

import { useEffect } from "react";
import { getItemIconSrcById } from "../../libs/league/league-utils";

interface ItemProps {
  itemId: string | number;
}

export const Item = ({ itemId }: ItemProps) => {
  useEffect(() => {}, []);

  return (
    <>
      <Avatar
        key={itemId}
        src={getItemIconSrcById(itemId?.toString())}
        alt={itemId?.toString()}
        shape="square"
      />
    </>
  );
};
