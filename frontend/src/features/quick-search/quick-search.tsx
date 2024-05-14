import { Dropdown, MenuProps, Modal } from "antd";
import { useState } from "react";
import GlobalSearch from "../global-search/global-search";

const editOptions = [
  {
    key: "1",
    label: "Set Summoner",
  },
  {
    key: "2",
    label: "Set to Doublelift",
  },
];

export const QuickSearch = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const onClickEditOption: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    if (e.key === "1") {
      showModal();
    }
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Dropdown.Button
        menu={{ items: editOptions, onClick: onClickEditOption }}
        type="primary"
        size="large"
      >
        Doublelift #NA1
      </Dropdown.Button>
      <Modal
        centered
        title="Set Default Summoner"
        open={open}
        // footer={null}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        width={800}
        onCancel={handleCancel}
      >
        <div className="flex  justify-center pt-10 pb-5">
          <GlobalSearch></GlobalSearch>
        </div>
      </Modal>
    </>
  );
};
