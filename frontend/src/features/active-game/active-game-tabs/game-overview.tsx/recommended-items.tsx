import React, { useState } from "react";
import { Card, Tooltip, Avatar, Skeleton, Typography, Modal } from "antd";
import {
  InfoCircleOutlined,
  ExpandAltOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { getItemIconSrcById } from "../../../../libs/league/league-utils";

const { Title, Text } = Typography;

interface ItemBuild {
  finalBuild: { itemId: string; itemName: string }[];
  buildSequence: { itemId: string; itemName: string; step: number }[];
}

interface RecommendedItemsProps {
  loadingItems: boolean;
  recommendedItems: ItemBuild | { itemId: string; itemName: string }[];
}

export const RecommendedItems: React.FC<RecommendedItemsProps> = ({
  loadingItems,
  recommendedItems,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if recommendedItems is the new ItemBuild structure or legacy array
  const isItemBuild = (
    items: ItemBuild | { itemId: string; itemName: string }[]
  ): items is ItemBuild => {
    return (
      typeof items === "object" &&
      "finalBuild" in items &&
      "buildSequence" in items
    );
  };

  const finalItems = isItemBuild(recommendedItems)
    ? recommendedItems.finalBuild
    : recommendedItems;

  const buildSequence = isItemBuild(recommendedItems)
    ? recommendedItems.buildSequence
    : [];

  const hasBuildSequence = buildSequence.length > 0;

  const openModal = () => {
    if (hasBuildSequence) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderFinalItems = () => (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2 justify-items-center">
      {finalItems.map(({ itemId, itemName }, index) => (
        <Tooltip key={index} title={itemName} placement="top">
          <div className="cursor-pointer transition-all duration-300 hover:scale-105">
            <Avatar
              src={getItemIconSrcById(itemId)}
              alt={`Item ${itemName}`}
              size={36}
              shape="square"
              className="rounded"
            />
          </div>
        </Tooltip>
      ))}
    </div>
  );

  const renderBuildSequenceModal = () => {
    if (!hasBuildSequence) return null;

    // Group items by step
    const stepGroups = buildSequence.reduce((acc, item) => {
      if (!acc[item.step]) acc[item.step] = [];
      acc[item.step].push(item);
      return acc;
    }, {} as Record<number, { itemId: string; itemName: string }[]>);

    return (
      <Modal
        title={
          <div className="flex items-center">
            <ShoppingCartOutlined className="mr-3 text-lg" />
            <Title level={4} className="mb-0">
              Detailed Build Order
            </Title>
          </div>
        }
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={900}
        centered
        styles={{
          body: {
            maxHeight: "80vh",
            overflowY: "auto",
            padding: "16px",
          },
        }}
      >
        <div>
          {/* Final Build Section */}
          <div className="mb-6">
            <Title level={5} className="mb-3">
              Final Build
            </Title>
            <div className="grid grid-cols-6 gap-2">
              {finalItems.map(({ itemId, itemName }, index) => (
                <Tooltip key={index} title={itemName} placement="top">
                  <div className="flex flex-col items-center">
                    <Avatar
                      src={getItemIconSrcById(itemId)}
                      alt={`Item ${itemName}`}
                      size={48}
                      shape="square"
                      className="rounded hover:scale-105 transition-transform cursor-pointer"
                    />
                    <Text
                      className="text-xs text-center mt-1 leading-tight"
                      style={{ maxWidth: "54px" }}
                      ellipsis={{ tooltip: itemName }}
                    >
                      {itemName}
                    </Text>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Build Sequence Section */}
          <div>
            <Title level={5} className="mb-4 flex items-center">
              <ShoppingCartOutlined className="mr-2" />
              Build Path
            </Title>

            <div className="max-h-64 overflow-y-auto">
              <div className="flex flex-wrap items-center gap-3">
                {Object.entries(stepGroups)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([step, items], stepIndex, array) => (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full mb-2">
                          Step {step}
                        </div>
                        <div className="flex gap-1 p-2 rounded border border-gray-200">
                          {items.map(({ itemId, itemName }, index) => (
                            <Tooltip
                              key={index}
                              title={itemName}
                              placement="top"
                            >
                              <Avatar
                                src={getItemIconSrcById(itemId)}
                                alt={`Item ${itemName}`}
                                size={28}
                                shape="square"
                                className="rounded hover:scale-105 transition-transform cursor-pointer"
                              />
                            </Tooltip>
                          ))}
                        </div>
                      </div>

                      {stepIndex < array.length - 1 && (
                        <ArrowRightOutlined className="text-lg self-center text-gray-400" />
                      )}
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <>
      <Card
        className="rounded-lg shadow-md"
        hoverable
        styles={{
          body: {
            padding: "12px",
          },
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <Title level={5} className="text-sm mb-0">
            Recommended Items
            <Tooltip title="AI-recommended items for this match.">
              <InfoCircleOutlined className="text-sm ml-1" />
            </Tooltip>
          </Title>
          {hasBuildSequence && (
            <div
              className="flex items-center px-2 py-1 rounded cursor-pointer transition-colors duration-300 border hover:bg-gray-50"
              onClick={openModal}
            >
              <Text className="text-xs mr-1 hidden sm:inline">Build</Text>
              <ExpandAltOutlined style={{ fontSize: "12px" }} />
            </div>
          )}
        </div>

        {loadingItems ? (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="p-1 rounded animate-pulse justify-self-center"
              >
                <Skeleton.Avatar
                  active
                  style={{ width: 36, height: 36 }}
                  shape="square"
                />
              </div>
            ))}
          </div>
        ) : (
          renderFinalItems()
        )}
      </Card>

      {renderBuildSequenceModal()}
    </>
  );
};
