import React, { useState } from "react";
import { Card, Tooltip, Avatar, Skeleton, Typography, Modal } from "antd";
import {
  InfoCircleOutlined,
  ExpandAltOutlined,
  ShoppingCartOutlined,
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
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 justify-items-center">
      {finalItems.map(({ itemId, itemName }, index) => (
        <Tooltip key={index} title={itemName} placement="top">
          <div className="cursor-pointer transition-all duration-300 hover:scale-105 group">
            <Avatar
              src={getItemIconSrcById(itemId)}
              alt={`Item ${itemName}`}
              size={40}
              shape="square"
              className="rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 group-hover:border-gray-300"
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
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div>
                <Title level={4} className="mb-0 text-gray-800">
                  Full Build Guide
                </Title>
              </div>
            </div>
          </div>
        }
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={850}
        centered
        styles={{
          body: {
            maxHeight: "80vh",
            overflowY: "auto",
            padding: 0,
          },
          header: {
            padding: "16px 16px 12px 16px",
            borderBottom: "1px solid #f0f0f0",
            marginBottom: 0,
          },
        }}
        className="build-guide-modal"
      >
        <div className="px-4 py-3">
          {/* Final Build Section */}
          <div className="mb-5">
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center flex-shrink-0">
                  <div
                    className="w-1 h-6 bg-gradient-to-b rounded-full mr-3"
                    style={{
                      background: "linear-gradient(180deg, #e89a3c, #d4861f)",
                    }}
                  ></div>
                  <Title level={5} className="mb-0 text-gray-800 font-semibold">
                    Final Build
                  </Title>
                </div>
                <div className="grid grid-cols-6 justify-items-center flex-1">
                  {finalItems.map(({ itemId, itemName }, index) => (
                    <Tooltip key={index} title={itemName} placement="top">
                      <div className="flex flex-col items-center group">
                        <Avatar
                          src={getItemIconSrcById(itemId)}
                          alt={`Item ${itemName}`}
                          size={44}
                          shape="square"
                          className="rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-2 border-white"
                        />
                        <Text
                          className="text-xs text-center mt-1 font-medium text-gray-700 leading-tight"
                          style={{ maxWidth: "50px" }}
                          ellipsis={{ tooltip: itemName }}
                        >
                          {itemName}
                        </Text>
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Build Sequence Section */}
          <div>
            <div className="bg-white rounded-lg border border-gray-100 p-4">
              <div className="max-h-64 overflow-y-auto">
                <div className="flex flex-wrap items-center gap-3 justify-center">
                  {Object.entries(stepGroups)
                    .sort(([a], [b]) => Number(a) - Number(b))
                    .map(([step, items], stepIndex, array) => (
                      <React.Fragment key={step}>
                        <div className="flex flex-col items-center mb-1">
                          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-3 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex gap-1">
                              {items.map(({ itemId, itemName }, index) => (
                                <Tooltip
                                  key={index}
                                  title={itemName}
                                  placement="top"
                                >
                                  <div className="relative group">
                                    <Avatar
                                      src={getItemIconSrcById(itemId)}
                                      alt={`Item ${itemName}`}
                                      size={32}
                                      shape="square"
                                      className="rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer border border-white shadow-sm"
                                    />
                                  </div>
                                </Tooltip>
                              ))}
                            </div>
                          </div>
                        </div>

                        {stepIndex < array.length - 1 && (
                          <ArrowRightOutlined className="text-lg text-gray-400 mx-1" />
                        )}
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Explanation Section */}
          <div className="mt-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
              <div className="flex items-start">
                <InfoCircleOutlined className="text-blue-500 mt-0.5 mr-3 text-sm" />
                <Text className="text-sm text-gray-700 leading-relaxed">
                  Build items from left to right in the final build for optimal
                  power progression. Follow the step-by-step sequence to
                  efficiently reach power spikes while adapting to enemy team
                  composition and game state as needed.
                </Text>
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
        className="rounded-xl shadow-lg border-0 bg-gradient-to-br from-white to-gray-50"
        hoverable
        styles={{
          body: {
            padding: "16px",
          },
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <Title
              level={5}
              className="text-sm mb-0 font-semibold text-gray-800"
            >
              Items
            </Title>
            <div className="flex items-center mt-1"></div>
          </div>
          {hasBuildSequence && (
            <div
              className="flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 bg-orange-50 hover:bg-orange-100 border border-orange-200 hover:border-orange-300"
              onClick={openModal}
              style={{
                backgroundColor: "#fef7ed",
                borderColor: "#fed7aa",
              }}
            >
              <Text
                className="text-xs mr-2 hidden sm:inline font-medium"
                style={{ color: "#ea580c" }}
              >
                More Details
              </Text>
              <ExpandAltOutlined
                style={{ fontSize: "12px", color: "#e89a3c" }}
              />
            </div>
          )}
        </div>

        {loadingItems ? (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="p-1 rounded-lg animate-pulse justify-self-center"
              >
                <Skeleton.Avatar
                  active
                  style={{ width: 40, height: 40 }}
                  shape="square"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-3 border border-gray-100">
            {renderFinalItems()}
          </div>
        )}
      </Card>

      {renderBuildSequenceModal()}
    </>
  );
};
